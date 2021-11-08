import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Meta } from "../entities/Meta";
import { Lancamento } from "../entities/Lancamento";

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
      .leftJoinAndSelect("meta.userMeta", "user")
      .getMany();

    return response.send({ metas });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const userRepository = getRepository(User);
    const lancamentoRepository = getRepository(Lancamento);

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

    const lancamentoExists = await lancamentoRepository.create({
      descricaoLancamento: lancamentoMeta.descricaoLancamento,
      categoryLancamento: lancamentoMeta.descricaoLancamento,
      tipoLancamento: lancamentoMeta.descricaoLancamento,
      essencial: lancamentoMeta.descricaoLancamento,
      lugarLancamento: lancamentoMeta.lugarLancamento,
      parcelaBaseada:  lancamentoMeta.lugarLancamento,      
      
    })

    if(!lancamentoExists) {
      return response.send({error: "Esse Lançamento não existe"})
    }
    
    const user = await userRepository.findOne({
      where: { id: userMetaId },
    });

    if (!user)
      return response.send({
        error: "Não existe esse id de user",
      });

    const newMeta = request.body;
    newMeta.userMeta = user;
    newMeta.lancamentoMeta = lancamentoExists;

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

    const metas = await metaRepository.find({
      where: { userMeta: user },
    });

    return response.send({ metas });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const goal = await metaRepository.findOne({
      where: { id: request.params.id },
    });

    return response.send({ goal });
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const metaRepository = getRepository(Meta);
    const userRepository = getRepository(User);

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
    const meta = await metaRepository.findOne({ where: { id } });

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
