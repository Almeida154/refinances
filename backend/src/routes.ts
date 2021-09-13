import { Router } from 'express';

import UserController from "./controller/UserController";
import categoryController from "./controller/CategoryController";
import categoryContaController from "./controller/CategoryContaController";
import contaController from "./controller/ContaController";
import NecessidadeController from "./controller/NecessidadeController";
import LancamentoController from './controller/LancamentoController';
import ConectaNecessidadesController from './controller/ConectaNecessidadesController';
import MetaController from './controller/MetaController';
import ParcelaController from './controller/ParcelaController';
import TransferenciaController from './controller/TransferenciaController';

import authMiddleware from './middlewares/authMiddleware';

const Routes = Router();

// User
Routes.get('/user/', authMiddleware, UserController.index);
Routes.post('/user/auth', UserController.auth);
Routes.get('/user/read', UserController.all);
Routes.get('/user/read/:id', UserController.one);
Routes.post('/user/create', UserController.save);
Routes.put('/user/edit/:id', UserController.edit);
Routes.delete('/user/remove/:id', UserController.remove);
Routes.delete('/user/remove', UserController.removeAll);

// Category
Routes.post('/category/create', categoryController.save);
Routes.get('/category/read', categoryController.showRelations);
Routes.get('/category/read/:id', categoryController.one);
Routes.post('/category/findbyname/:iduser', categoryController.FindByName);
Routes.put('/category/edit/:id', categoryController.edit);
Routes.delete('/category/remove/:id', categoryController.remove);
Routes.delete('/category/remove', categoryController.removeAll);

// CategoryConta
Routes.post('/categoryconta/create', categoryContaController.save);
Routes.get('/categoryconta/read', categoryContaController.showRelations);
Routes.get('/categoryconta/read/:id', categoryContaController.one);
Routes.post('/categoryconta/findbyname/:iduser', categoryContaController.FindByName);
Routes.put('/categoryconta/edit/:id', categoryContaController.edit);
Routes.delete('/categoryconta/remove/:id', categoryContaController.remove);
Routes.delete('/categoryconta/remove', categoryContaController.removeAll);

// Conta
Routes.post('/conta/create', contaController.save);
Routes.get('/conta/read', contaController.showRelations);
Routes.get('/conta/read/:id', contaController.one);
Routes.put('/conta/edit/:id', contaController.edit);
Routes.delete('/conta/remove/:id', contaController.remove);
Routes.delete('/conta/remove', contaController.removeAll);

// Necessidade
Routes.post('/necessidade/create', NecessidadeController.save);
Routes.get('/necessidade/read', NecessidadeController.showRelations);
Routes.get('/necessidade/read/:id', NecessidadeController.one);
Routes.put('/necessidade/edit/:id', NecessidadeController.edit);
Routes.delete('/necessidade/remove/:id', NecessidadeController.remove);
Routes.delete('/necessidade/remove', NecessidadeController.removeAll);

// Lançamento
Routes.post('/lancamento/create', LancamentoController.save);
Routes.get('/lancamento/read', LancamentoController.showRelations);
Routes.get('/lancamento/read/:id', LancamentoController.one);
Routes.put('/lancamento/edit/:id', LancamentoController.edit);
Routes.delete('/lancamento/remove/:id', LancamentoController.remove);
Routes.delete('/lancamento/remove', LancamentoController.removeAll);

// Conecta Necessidades
Routes.post('/conectanecessidades/create', ConectaNecessidadesController.save);
Routes.get('/conectanecessidades/read', ConectaNecessidadesController.showRelations);
Routes.get('/conectanecessidades/read/:id', ConectaNecessidadesController.one);
Routes.put('/conectanecessidades/edit/:id', ConectaNecessidadesController.edit);
Routes.delete('/conectanecessidades/remove/:id', ConectaNecessidadesController.remove);
Routes.delete('/conectanecessidades/remove', ConectaNecessidadesController.removeAll);

// Meta
Routes.post('/meta/create', MetaController.save);
Routes.get('/meta/read', MetaController.showRelations);
Routes.get('/meta/read/:id', MetaController.one);
Routes.put('/meta/edit/:id', MetaController.edit);
Routes.delete('/meta/remove/:id', MetaController.remove);
Routes.delete('/meta/remove', MetaController.removeAll);

// Parcela
Routes.post('/parcela/create', ParcelaController.save);
Routes.get('/parcela/read', ParcelaController.showRelations);
Routes.get('/parcela/read/:id', ParcelaController.one);
Routes.put('/parcela/edit/:id', ParcelaController.edit);
Routes.delete('/parcela/remove/:id', ParcelaController.remove);
Routes.delete('/parcela/remove', ParcelaController.removeAll);

// Transferencia
Routes.post('/transferencia/create', TransferenciaController.save);
Routes.get('/transferencia/read', TransferenciaController.showRelations);
Routes.get('/transferencia/read/:id', TransferenciaController.one);
Routes.put('/transferencia/edit/:id', TransferenciaController.edit);
Routes.delete('/transferencia/remove/:id', TransferenciaController.remove);
Routes.delete('/transferencia/remove', TransferenciaController.removeAll);

export default Routes;