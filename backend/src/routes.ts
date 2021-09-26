import { Router } from 'express';

import UserController from "./controllers/UserController";
import CategoryController from "./controllers/CategoryController";
import CategoryAccountController from "./controllers/CategoryAccountController";
import AccountController from "./controllers/AccountController";
import NecessityController from "./controllers/NecessityController";
import EntryController from './controllers/EntryController';
import ConnectNecessityController from './controllers/ConnectNecessityController';
import GoalController from './controllers/GoalController';
import InstallmentController from './controllers/InstallmentController';
import TransferController from './controllers/TransferController';

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
Routes.post('/category/create', CategoryController.save);
Routes.get('/category/read', CategoryController.showRelations);
Routes.get('/category/read/:id', CategoryController.one);
Routes.post('/category/findbyname/:iduser', CategoryController.FindByName);
Routes.post('/category/findbyuser/:iduser', CategoryController.FindByUser);
Routes.put('/category/edit/:id', CategoryController.edit);
Routes.delete('/category/remove/:id', CategoryController.remove);
Routes.delete('/category/remove', CategoryController.removeAll);

// CategoryConta
Routes.post('/categoryAccount/create', CategoryAccountController.save);
Routes.get('/categoryAccount/read', CategoryAccountController.showRelations);
Routes.get('/categoryAccount/read/:id', CategoryAccountController.one);
Routes.post('/categoryAccount/findbyname/:iduser', CategoryAccountController.FindByName);
Routes.post('/categoryAccount/findbyuser/:iduser', CategoryAccountController.FindByUser);
Routes.put('/categoryAccount/edit/:id', CategoryAccountController.edit);
Routes.delete('/categoryAccount/remove/:id', CategoryAccountController.remove);
Routes.delete('/categoryAccount/remove', CategoryAccountController.removeAll);

// Conta
Routes.post('/account/create', AccountController.save);
Routes.get('/account/read', AccountController.showRelations);
Routes.get('/account/read/:id', AccountController.one);
Routes.post('/account/findbyuser/:iduser', AccountController.FindByUser);
Routes.put('/account/edit/:id', AccountController.edit);
Routes.delete('/account/remove/:id', AccountController.remove);
Routes.delete('/account/remove', AccountController.removeAll);

// Necessidade
Routes.post('/necessity/create', NecessityController.save);
Routes.get('/necessity/read', NecessityController.showRelations);
Routes.get('/necessity/read/:id', NecessityController.one);
Routes.put('/necessity/edit/:id', NecessityController.edit);
Routes.delete('/necessity/remove/:id', NecessityController.remove);
Routes.delete('/necessity/remove', NecessityController.removeAll);

// Conecta Necessidades
Routes.post('/connectNecessity/create', ConnectNecessityController.save);
Routes.get('/connectNecessity/read', ConnectNecessityController.showRelations);
Routes.get('/connectNecessity/read/:id', ConnectNecessityController.one);
Routes.put('/connectNecessity/edit/:id', ConnectNecessityController.edit);
Routes.delete('/connectNecessity/remove/:id', ConnectNecessityController.remove);
Routes.delete('/connectNecessity/remove', ConnectNecessityController.removeAll);

// Lançamento
Routes.post('/entry/create', EntryController.save);
Routes.get('/entry/read', EntryController.showRelations);
Routes.get('/entry/read/:id', EntryController.one);
Routes.post('/entry/findbyuser/:iduser', EntryController.FindByUser);
Routes.put('/entry/edit/:id', EntryController.edit);
Routes.delete('/entry/remove/:id', EntryController.remove);
Routes.delete('/entry/remove', EntryController.removeAll);

// Meta
Routes.post('/goal/create', GoalController.save);
Routes.get('/goal/read', GoalController.showRelations);
Routes.get('/goal/read/:id', GoalController.one);
Routes.put('/goal/edit/:id', GoalController.edit);
Routes.delete('/goal/remove/:id', GoalController.remove);
Routes.delete('/goal/remove', GoalController.removeAll);

// Parcela
Routes.post('/installment/create', InstallmentController.save);
Routes.get('/installment/read', InstallmentController.showRelations);
Routes.get('/installment/read/:id', InstallmentController.one);
Routes.put('/installment/edit/:id', InstallmentController.edit);
Routes.delete('/installment/remove/:id', InstallmentController.remove);
Routes.delete('/installment/remove', InstallmentController.removeAll);

// Transferencia

Routes.post('/transfer/create', TransferController.save);
Routes.get('/transfer/read', TransferController.showRelations);
Routes.get('/transfer/read/:id', TransferController.one);
Routes.post('/transfer/findbyuser/:iduser', TransferController.FindByUser);
Routes.put('/transfer/edit/:id', TransferController.edit);
Routes.delete('/transfer/remove/:id', TransferController.remove);
Routes.delete('/transfer/remove', TransferController.removeAll);

export default Routes;