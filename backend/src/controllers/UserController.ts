import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import VerificaSeOEmailExiste from "../helpers/VerificaSeOEmailExiste";
import { Lancamento } from "../entities/Lancamento";
import { CategoryConta } from "../entities/CategoryConta";
import { Category } from "../entities/Category";
import { Conta } from "../entities/Conta";
import { Parcela } from "../entities/Parcela";

function addMonths(date: Date, months: number) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

class UserController {
  async index(request: Request, response: Response, next: NextFunction) {
    return response.send({ userID: request.userId });
  }

  async setupUser(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const lancamentoRepository = getRepository(Lancamento);
    const categoryContaRepository = getRepository(CategoryConta);
    const categoryRepository = getRepository(Category);
    const contaRepository = getRepository(Conta);
    const parcelaRepository = getRepository(Parcela);

    const user = await userRepository.findOne({
      where: { id: request.params.id },
    });

    const entries = request.body.entries;
    const allCategories = request.body.allCategories;
    allCategories.push({
      iconeCategoria: "Ionicons:rocket-outline",
      tetoDeGastos: 0,
      nomeCategoria: "Meta",
      tipoCategoria: "despesa",
      userCategory: user,
      corCategoria: "#434235",
    });

    if (!user) {
      return response.send({ error: "Usuario nao encontrado" });
    }

    // Categoria Conta
    const nomesCategoriasContaPadroes = [
      ["Carteira", "Entypo:wallet", "#669941"],
      ["Poupança", "MaterialCommunityIcons:currency-usd-circle", "#123456"],
      ["Investimentos", "MaterialIcons:show-chart", "#654321"],
    ];

    const categoriasContasPadroes = [] as CategoryConta[];

    for (var i = 0; i < nomesCategoriasContaPadroes.length; i++) {
      const funcao = async (item) => {
        const newCategoriaConta = categoryContaRepository.create({
          iconeCategoryConta: item[1],
          descricaoCategoryConta: item[0],
          userCategoryConta: user,
          corCategoryConta: item[2],
        });

        categoriasContasPadroes.push(
          await categoryContaRepository.save(newCategoriaConta)
        );
      };

      await funcao(nomesCategoriasContaPadroes[i]);
    }

    // Contas
    const newConta = contaRepository.create({
      descricao: "Conta Principal",
      categoryConta: categoriasContasPadroes[0],
      saldoConta: 0,
      userConta: user,
    });

    const contaPrincipal = await contaRepository.save(newConta);

    // Categorias
    const categoriasPadroes = [];

    for (var i = 0; i < allCategories.length; i++) {
      const funcao = async (categoryLancamento) => {
        const newCategoria = categoryRepository.create({
          iconeCategoria: categoryLancamento.iconeCategoria,
          tetoDeGastos: 0,
          nomeCategoria: categoryLancamento.nomeCategoria,
          tipoCategoria: categoryLancamento.tipoCategoria,
          userCategory: user,
          corCategoria: categoryLancamento.corCategoria,
        });

        categoriasPadroes.push(await categoryRepository.save(newCategoria));
      };

      await funcao(allCategories[i]);
    }

    // Lancamentos
    entries.map(async (item) => {
      const categoriaLancamento = categoriasPadroes.findIndex((categoria) => {
        return categoria.nomeCategoria == item.categoryLancamento.nomeCategoria;
      });

      const newLancamento = await lancamentoRepository.save(
        lancamentoRepository.create({
          descricaoLancamento: item.descricaoLancamento,
          essencial: true,
          lugarLancamento: "extrato",
          parcelaBaseada: 0,
          tipoLancamento: item.tipoLancamento,
          userLancamento: user,
          categoryLancamento: categoriasPadroes[categoriaLancamento],
        })
      );

      // Parcela

      item.parcelasLancamento;
      const newParcela = parcelaRepository.create({
        contaParcela: contaPrincipal,
        lancamentoParcela: newLancamento,
        userParcela: user,
        statusParcela:
          new Date(item.parcelasLancamento[0].dataParcela) > new Date()
            ? false
            : true,
        valorParcela: item.parcelasLancamento[0].valorParcela,
        dataParcela: item.parcelasLancamento[0].dataParcela,
      });

      await parcelaRepository.save(newParcela);

      const updateDate = new Date(newParcela.dataParcela);
      let parcela: any;
      for (var i = 1; i < 24; i++) {
        parcela = parcelaRepository.create(newParcela);

        parcela.dataParcela = updateDate;

        parcela.statusParcela = false;

        await parcelaRepository.save(parcela);

        addMonths(updateDate, 1);
      }
    });

    return response.send({ message: entries });
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.find();
    return response.send({ user });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id: request.params.id },
    });
    return response.send({ user });
  }

  async auth(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);

    const { emailUsuario, senhaUsuario } = request.body;

    if (emailUsuario == "" && senhaUsuario == "")
      return response.send({
        message: "Preencha todos os campos!",
        error: "both",
      });

    if (emailUsuario == "")
      return response.send({
        message: "Email em branco!",
        error: "email",
      });

    if (senhaUsuario == "")
      return response.send({
        message: "Senha em branco!",
        error: "senha",
      });

    const user = await userRepository.findOne({
      where: { emailUsuario },
    });

    if (!user)
      return response.send({
        message: "Email não encontrado!",
        error: "email",
      });

    const isValidPassword = await bcrypt.compare(
      senhaUsuario,
      user.senhaUsuario
    );

    if (!isValidPassword)
      return response.send({
        message: "Senha incorreta!",
        error: "senha",
      });

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    delete user.senhaUsuario;

    return response.send({
      user: {
        id: user.id,
        nomeUsuario: user.nomeUsuario,
        emailUsuario: user.emailUsuario,
        senhaUsuario: user.senhaUsuario,
        fotoPerfilUsuario:
          user.fotoPerfilUsuario != null
            ? user.fotoPerfilUsuario.toString()
            : null,
      },
      token,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const { nomeUsuario, emailUsuario, senhaUsuario, fotoPerfilUsuario } =
      request.body;

    if (!VerificaSeOEmailExiste(emailUsuario))
      return response.send({ error: "Formato de email inválido" });
    if (emailUsuario == "" || emailUsuario == undefined)
      return response.send({ error: "Digite seu email!" });
    if (senhaUsuario == "" || senhaUsuario == undefined)
      return response.send({ error: "Digite sua senha!" });

    const userexists = await userRepository.find({ where: { emailUsuario } });
    if (userexists.length > 0)
      return response.send({ error: "Email já cadastrado" });

    if (nomeUsuario == "" || nomeUsuario == undefined)
      return response.send({ error: "Nome não especificado" });

    const user = userRepository.create(request.body);
    await userRepository.save(user);

    return response.send({ user });
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const id = parseInt(request.params.id);

    const { nomeUsuario, emailUsuario, senhaUsuario, fotoPerfilUsuario } =
      request.body;

    if (nomeUsuario == "") return response.send({ error: "Nome em branco!" });
    if (emailUsuario == "") return response.send({ error: "Email em branco!" });
    if (senhaUsuario == "") return response.send({ error: "Senha em branco!" });

    const userexists = await userRepository.find({
      where: { emailUsuario },
    });

    console.log(id);

    if (
      userexists.length > 1 ||
      (userexists.length == 1 && userexists[0].id != id)
    )
      return response.send({ error: "Email já cadastrado" });

    await userRepository.update(id, request.body);
    const updatedUser = await userRepository.findOne({ where: { id } });

    return response.send({ updatedUser });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    let userToRemove = await userRepository.findOne(request.params.id);
    await userRepository.remove(userToRemove);
    return response.send({ mes: "foi" });
  }

  async removeAll(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    let userToRemove = await userRepository.find();
    await userRepository.remove(userToRemove);
    return response.send({ mes: "foi" });
  }

  async emailExists(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const { emailUsuario } = request.body;

    const existing = await userRepository.find({ where: { emailUsuario } });
    if (existing.length > 0) return response.send({ exists: true });
    return response.send({ exists: false });
  }

  async avatar(request: Request, response: Response, next: NextFunction) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: request.params.id },
    });

    return response.send({
      avatar:
        user.fotoPerfilUsuario != null
          ? user.fotoPerfilUsuario.toString()
          : null,
    });
  }
}

export default new UserController();
