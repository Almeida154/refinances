import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { User } from "../entities/User";
import { Config } from "../entities/Config";

class ConfigController {
  async all(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    const config = await configRepository.find();

    return response.send({ config });
  } 

  async save(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    const userRepository = getRepository(User);

    const {      
      theme,
      userId,
    } = request.body;

    
    if(!theme) {
      return response.send({error: "Tema não encontrado"})
    }
    
    const user = await userRepository.findOne({
      where: { id: request.params.user_id },
    });
    
    if (!user)
    return response.send({
      error: "Não existe esse id de user",
    });      
    
    const newConfig = request.body;
    newConfig.userConfig = user;
    
    const config = configRepository.create(newConfig);
    console.log("Veio aquio", config)
    await configRepository.save(config);

    return response.send({ config: config });
  }

  async FindByUser(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    const userRepository = getRepository(User);

    const iduser = parseInt(request.params.user_id)
    const user = await userRepository.findOne({
      where: {
        id: iduser
      },
    });

    if (!user) {
      return response.send({ error: "usuário não encontrado" });
    }

    const config = await configRepository.createQueryBuilder("config")
      .select(["config", "user.id"])
      .leftJoinAndSelect("config.userConfig", "user")
      .where("user.id = :id", {id: request.params.user_id})
      .getOne()
      

    return response.send({ config });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    
    const config = await configRepository.createQueryBuilder("config")            
      .where("config.id = :id", {id: request.params.id})
      .getOne()

    return response.send({ config });
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    const userRepository = getRepository(User);

    const {      
      theme,          
    } = request.body;    

    const userExists = await userRepository.findOne({
      where: { id: request.params.user_id },
    });

    if (!userExists)
      return response.send({
        error: "Não existe esse user aí",
      });

    const updateConfig = request.body;
    updateConfig.userIdid = userExists;
    updateConfig.id = request.params.id

    await configRepository.update(request.params.id, updateConfig);    

    return response.send({ message: updateConfig });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    let configToRemove = await configRepository.findOne(request.params.id);
    await configRepository.remove(configToRemove);
    return response.send({ mes: "foi" });
  }
  

  async removeAll(request: Request, response: Response, next: NextFunction) {
    const configRepository = getRepository(Config);
    let configToRemove = await configRepository.find();
    await configRepository.remove(configToRemove);

    return response.send({ mes: "foi" });
  }
}

export default new ConfigController();
