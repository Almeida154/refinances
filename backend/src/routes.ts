import { Router } from "express";

import UserController from "./controllers/UserController";
import CategoryController from "./controllers/CategoryController";
import AccountController from "./controllers/AccountController";
import EntryController from "./controllers/EntryController";
import GoalController from "./controllers/GoalController";
import InstallmentController from "./controllers/InstallmentController";
import TransferController from "./controllers/TransferController";
import ConfigController from "./controllers/ConfigController";

import authMiddleware from "./middlewares/authMiddleware";

const Routes = Router();

// User
Routes.get("/user/", authMiddleware, UserController.index);
Routes.post("/user/auth", UserController.auth);
Routes.get("/user/read", UserController.all);
Routes.get("/user/read/:id", UserController.one);
Routes.post("/user/create", UserController.save);
Routes.post("/user/setupuser/:id", UserController.setupUser);
Routes.put("/user/edit/:id", UserController.edit);
Routes.delete("/user/remove/:id", UserController.remove);
Routes.delete("/user/remove", UserController.removeAll);

Routes.post("/user/emailexists", UserController.emailExists);
Routes.get("/user/avatar/:id", UserController.avatar);

// Category
Routes.post("/category/create", CategoryController.save);
Routes.get("/category/read", CategoryController.showRelations);
Routes.get("/category/read/:id", CategoryController.one);
Routes.post("/category/findbyname/:iduser", CategoryController.FindByName);
Routes.post("/category/findbyuser/:iduser", CategoryController.CountByEntry); // Mudança pro CountByEntry
Routes.post("/category/countbyentry/:iduser", CategoryController.CountByEntry);
Routes.put("/category/edit/:id", CategoryController.edit);
Routes.delete("/category/remove/:id", CategoryController.remove);
Routes.delete("/category/remove", CategoryController.removeAll);

// Conta
Routes.post("/account/create", AccountController.save);
Routes.get("/account/read", AccountController.showRelations);
Routes.get("/account/read/:id", AccountController.one);
Routes.post("/account/findbyuser/:iduser", AccountController.FindByUser);
Routes.put("/account/edit/:id", AccountController.edit);
Routes.delete("/account/remove/:id", AccountController.remove);
Routes.delete("/account/remove", AccountController.removeAll);

// Lançamento
Routes.post("/entry/create", EntryController.save);
Routes.get("/entry/read", EntryController.showRelations);
Routes.get("/entry/read/:id", EntryController.one);
Routes.post("/entry/findbyuser/:iduser", EntryController.FindByUser);
Routes.put("/entry/edit/:id", EntryController.edit);
Routes.delete("/entry/remove/:id", EntryController.remove);
Routes.delete("/entry/remove", EntryController.removeAll);

// Meta
Routes.post("/goal/create", GoalController.save);
Routes.get("/goal/read", GoalController.showRelations);
Routes.get("/goal/read/:id", GoalController.one);
Routes.post("/goal/findbyuser/:iduser", GoalController.FindByUser);
Routes.put("/goal/edit/:id", GoalController.edit);
Routes.delete("/goal/remove/:id", GoalController.remove);
Routes.delete("/goal/remove", GoalController.removeAll);

// Parcela
Routes.post("/installment/create", InstallmentController.save);
Routes.get("/installment/read", InstallmentController.showRelations);
Routes.get("/installment/read/:id", InstallmentController.one);
Routes.put("/installment/edit", InstallmentController.edit);
Routes.put("/installment/edit/:id", InstallmentController.EditOne);
Routes.post(
  "/installment/groupbydate/:iduser",
  InstallmentController.GroupByDate
);
Routes.put("/installment/changestatus/:id", InstallmentController.ChangeStatus);
Routes.delete("/installment/remove/:id", InstallmentController.remove);
Routes.delete("/installment/remove", InstallmentController.removeAll);

// Transferencia
Routes.post("/transfer/create", TransferController.save);
Routes.get("/transfer/read", TransferController.showRelations);
Routes.get("/transfer/read/:id", TransferController.one);
Routes.post("/transfer/findbyuser/:iduser", TransferController.FindByUser);
Routes.post("/transfer/groupbydate/:iduser", TransferController.GroupByDate);
Routes.put("/transfer/edit/:id", TransferController.edit);
Routes.delete("/transfer/remove/:id", TransferController.remove);
Routes.delete("/transfer/remove", TransferController.removeAll);

// Config
Routes.post('/config/create/:user_id', ConfigController.save);
Routes.post('/config/findbyuser/:user_id', ConfigController.FindByUser);
Routes.put('/config/edit/:user_id', ConfigController.edit);

export default Routes;
