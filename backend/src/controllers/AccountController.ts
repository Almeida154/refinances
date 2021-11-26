import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { User } from "../entities/User";
import { Conta } from "../entities/Conta";

class ContaController {
  async all(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    const conta = await contaRepository.find();

    return response.send({ conta });
  }

  async showRelations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const contaRepository = getRepository(Conta);

    const contas = await contaRepository
      .createQueryBuilder("conta")
      .leftJoinAndSelect("conta.userConta", "user")
      .getMany();

    // const contasCategoryConta = await contaRepository
    //   .createQueryBuilder("conta")
    //   .leftJoinAndSelect("conta.categoryConta", "user")
    //   .getMany();

    // contas.map((item, index) => {
    //     contas[index].categoryConta = contasCategoryConta[index].categoryConta
    // });

    return response.send({ contas });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    const userRepository = getRepository(User);

    const { descricao, saldoConta, categoryConta, userConta } = request.body;

    if (descricao == "")
      return response.send({ error: "descrição em branco!" });
    if (saldoConta == undefined)
      return response.send({ error: "saldo em branco!" });
    //if (categoryConta == "") return response.send({ error: "Sem categoria" });
    if (userConta == "") return response.send({ error: "user em branco!" });

    const contaExists = await contaRepository.find({
      where: { descricao, userConta },
    });

    if (contaExists.length > 0)
      return response.send({
        error: "Já existe uma conta com essa descrição",
      });

    const newUser = await userRepository.findOne({
      where: { id: userConta },
    });

    if (newUser == undefined)
      return response.send({
        error: "Esse user não existe",
      });

    const newConta = request.body;
    newConta.userConta = newUser;
    const conta = contaRepository.create(newConta);

    await contaRepository.save(conta);

    return response.send({ message: conta });
  }
  async one(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);

    const conta = await contaRepository
      .createQueryBuilder("conta")
      .leftJoinAndSelect("conta.userConta", "user")
      .leftJoinAndSelect("conta.parcelasConta", "parcela")
      .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
      .where("conta.id = :id", { id: request.params.id })
      .getOne();

    conta.parcelasConta.map((item) => {
      conta.saldoConta +=
        item.lancamentoParcela.tipoLancamento == "despesa"
          ? -item.valorParcela
          : item.valorParcela;
    });

    return response.send({ conta });
  }

  async FindByUser(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: request.params.iduser,
      },
    });

    if (!user) {
      return response.send({ error: "usuário não encontrado" });
    }

    const contasRecebidas = await contaRepository
      .createQueryBuilder("conta")
      .select(["conta", "user.id"])
      .leftJoinAndSelect("conta.userConta", "user")
      .leftJoinAndSelect("conta.parcelasConta", "parcela")
      .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
      // .leftJoinAndSelect("conta.categoryConta", "categoryconta")
      .leftJoinAndSelect("conta.transferenciasRecebidas", "transferencia")
      .where("user.id = :id", { id: user.id })
      .getMany();

    const contasEnviadas = await contaRepository
      .createQueryBuilder("conta")
      .select(["conta", "user.id"])
      .leftJoinAndSelect("conta.userConta", "user")
      .leftJoinAndSelect("conta.transferenciasEnviadas", "transferencia")
      .where("user.id = :id", { id: user.id })
      .getMany();

    contasRecebidas.map((conta, index) => {
      conta.parcelasConta.map((item) => {
        if (item.statusParcela)
          contasRecebidas[index].saldoConta +=
            item.lancamentoParcela.tipoLancamento == "despesa"
              ? -item.valorParcela
              : item.valorParcela;
      });

      conta.transferenciasRecebidas.map((transferenciaRecebida, index) => {
        contasRecebidas[index].saldoConta +=
          transferenciaRecebida.valorTransferencia;
      });

      contasEnviadas[index].transferenciasEnviadas.map(
        (transferenciaEnviada, index) => {
          contasRecebidas[index].saldoConta -=
            transferenciaEnviada.valorTransferencia;
        }
      );
    });

    return response.send({ contas: contasRecebidas });
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    const userRepository = getRepository(User);

    const id = parseInt(request.params.id);

    const { descricao, saldoConta, categoryConta, userConta } = request.body;

    if (descricao == "")
      return response.send({ error: "descrição em branco!" });
    if (saldoConta == "") return response.send({ error: "saldo em branco!" });
    // if (categoryConta == "") return response.send({ error: "Sem categoria" });
    if (userConta == "") return response.send({ error: "user em branco!" });

    const contaExists = await contaRepository.find({
      where: { descricao },
    });

    if (
      contaExists.length > 1 ||
      (contaExists.length == 1 && contaExists[0].id != id)
    ) {
      return response.send({ error: "Já existe uma conta com essa descrição" });
    }

    const newUser = await userRepository.findOne({
      where: { id: userConta },
    });

    if (newUser == undefined)
      return response.send({
        error: "Esse user não existe",
      });

    const newConta = request.body;
    newConta.userConta = newUser;

    await contaRepository.update(id, newConta);

    const conta = await contaRepository.findOne({
      where: { id },
    });

    return response.send({ message: conta });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    let contaToRemove = await contaRepository.findOne(request.params.id);
    await contaRepository.remove(contaToRemove);
    return response.send({ mes: "foi" });
  }

  async removeAll(request: Request, response: Response, next: NextFunction) {
    const contaRepository = getRepository(Conta);
    let contaToRemove = await contaRepository.find();
    await contaRepository.remove(contaToRemove);

    return response.send({ mes: "foi" });
  }
}

export default new ContaController();
