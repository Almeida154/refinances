import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Meta } from "../entities/Meta";
import { Lancamento } from "../entities/Lancamento";
import { Parcela } from "../entities/Parcela";

class MetaController {
  async all(request: Request, response: Response, next: NextFunction) {
    const metasRepository = getRepository(Meta);
    const metas = await metasRepository.find();

    return response.send({ metas });
  }

  async showRelations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const metaRepository = getRepository(Meta);

    const metas = await metaRepository
      .createQueryBuilder("meta")
      // .leftJoinAndSelect("meta.userMeta", "user")
      .leftJoinAndSelect("meta.lancamentoMeta", "lancamento")
      .getMany();

    return response.send({ metas });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const userRepository = getRepository(User);
    const lancamentoRepository = getRepository(Lancamento);
    const parcelaRepository = getRepository(Parcela);
    const categoryRepository = getRepository(Category);

    const {
      descMeta,
      saldoFinalMeta,
      saldoAtualMeta,
      dataInicioMeta,
      dataFimMeta,
      realizacaoMeta,
      userMetaId,
      lancamentoMeta
    } = request.body;

    
    const user = await userRepository.findOne({
      where: { id: userMetaId },
    });

    if (!user)
      return response.send({
        error: "Não existe esse id de user",
      });      
      
    const categoryExists = await categoryRepository.findOne({where: {userCategory: userMetaId, nomeCategoria: lancamentoMeta.categoryLancamento}, 
      join: {
        alias: 'category',
        leftJoinAndSelect: {
          user: "category.userCategory"
        }
      }})


    const lancamentoCreate = await lancamentoRepository.create({
      descricaoLancamento: lancamentoMeta.descricaoLancamento,
      categoryLancamento: categoryExists,
      tipoLancamento: lancamentoMeta.tipoLancamento,
      essencial: lancamentoMeta.essencial,
      lugarLancamento: lancamentoMeta.lugarLancamento,
      parcelaBaseada:  lancamentoMeta.parcelaBaseada,      
      userLancamento: user      
    })    

    await lancamentoRepository.save(lancamentoCreate)
       
    lancamentoMeta.parcelasLancamento[0].lancamentoParcela = lancamentoCreate
    lancamentoMeta.parcelasLancamento[0].userParcela = user
    const newParcela = parcelaRepository.create(lancamentoMeta.parcelasLancamento[0])

    await parcelaRepository.save(newParcela)

    const newMeta = request.body;
    newMeta.userMeta = user;
    newMeta.lancamentoMeta = lancamentoCreate;

    
    const meta = metaRepository.create(newMeta);
    await metaRepository.save(meta);

    return response.send({ meta: meta });
  }

  async FindByUser(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: request.params.iduser,
      },
    });

    if (!user) {
      return response.send({ error: "usuário não encontrado" });
    }

    const metas = await metaRepository.createQueryBuilder("meta")
      .select(["meta", "user.id"])
      .leftJoin("meta.userMeta", "user")
      .leftJoinAndSelect("meta.lancamentoMeta", "lancamento")
      .where("user.id = :id", {id: user.id})
      .getMany()

    console.log(metas)

    return response.send({ metas });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    
    const goal = await metaRepository.createQueryBuilder("meta")            
      .leftJoinAndSelect("meta.lancamentoMeta", "lancamento")
      .where("meta.id = :id", {id: request.params.id})
      .getOne()

    return response.send({ goal });
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const userRepository = getRepository(User);
    const parcelaRepository = getRepository(Parcela);

    const {
      descMeta,
      saldoFinalMeta,
      SaldoAtualMeta,
      dataInicioMeta,
      realizacaoMeta,
      dataFimMeta,
      userMeta,
    } = request.body;
    const id = parseInt(request.params.id);

    if (descMeta == "") return response.send({ error: "nome em branco!" });
    if (saldoFinalMeta == undefined)
      return response.send({ error: "Saldo final da meta não inserido" });
    //if (SaldoAtualMeta == undefined)
      //return response.send({ error: "saldo atual da meta não inserido!" });
    if (dataInicioMeta == undefined)
      return response.send({ error: "data inicial da meta não inserido!" });
    if (dataFimMeta == undefined)
      return response.send({ error: "data final da meta não inserido!" });
    if (realizacaoMeta == undefined)
      return response.send({ error: "realização da meta não inserido!" });
    //if (userMeta == undefined)
      //return response.send({ error: "user da meta não inserido!" });

    const userExists = await userRepository.findOne({
      where: { id: userMeta },
    });

    if (!userExists)
      return response.send({
        //error: "Não existe esse user aí",
      });

    const updateMeta = request.body;
    updateMeta.userMeta = userExists;

    await metaRepository.update(id, updateMeta);
    const meta = await metaRepository.findOne({ 
      where: { id } ,
      join: {
        alias: 'meta',
        leftJoinAndSelect: {
          lancamento: "meta.lancamentoMeta"
        }
      }
    });

    const updatesParcela = await parcelaRepository.createQueryBuilder("parcela")      
      .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
      .where("lancamento.id = :id", {id: meta.lancamentoMeta.id})
      .getMany()

      updatesParcela.map(item => {
        item.statusParcela = true

        parcelaRepository.update(item.id, item)
      })
    return response.send({ message: "atualizou a meta " + meta });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    let metaToRemove = await metaRepository.findOne(request.params.id);
    await metaRepository.remove(metaToRemove);
    return response.send({ mes: "foi" });
  }
  

  async removeAll(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    let metaToRemove = await metaRepository.find();
    await metaRepository.remove(metaToRemove);

    return response.send({ mes: "foi" });
  }
}

export default new MetaController();
