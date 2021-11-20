import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { CategoryConta } from "../entities/CategoryConta";
import { User } from "../entities/User";

class CategoryContaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const categoryContaRepository = getRepository(CategoryConta);
        const categoryConta = await categoryContaRepository.find();
        return response.send({ categoryConta });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const categoryContaRepository = getRepository(CategoryConta);
        const categoriesConta = await categoryContaRepository
            .createQueryBuilder("categoryConta")
            .leftJoinAndSelect("categoryConta.userCategoryConta", "user")                        
            .getMany()

        return response.send({categoriesConta})
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const categoryContaRepository = getRepository(CategoryConta);  
        const userRepository = getRepository(User);

        const { descricaoCategoryConta, iconeCategoryConta, userCategoryConta, corCategoryConta } = request.body;

        if (descricaoCategoryConta == '') return response.send({ error: "Descrição em branco!" });
        if (!corCategoryConta) return response.send({error: "Cor da categoria conta não especificado"})
        if (userCategoryConta == null) return response.send({ error: "Sem Usuário!" });

        const user = await userRepository.findOne({
            where: { id: userCategoryConta }
        });

        const categoryContaExists = await categoryContaRepository.findOne({
            where: { descricaoCategoryConta, userCategoryConta: user }
        });
        
        if (user == undefined) return response.send({ error: "User não encontrado" });
        if (categoryContaExists) return response.send({ error: "Já existe uma categoria com essa descrição" });

        const newCategoryConta = request.body;
        newCategoryConta.userCategory = user;
        const category = categoryContaRepository.create(newCategoryConta);
        await categoryContaRepository.save(category);

        return response.send({ message: category });
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);

        const categoriesConta = await categoryContaRepository.createQueryBuilder("categoryConta")
            .leftJoinAndSelect("categoryConta.userCategoryConta", "user")
            .where("categoryConta.id = :id", { id: request.params.id })
            .getMany();

        return response.send({ categoriesConta });
    }   

    async FindByName(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({where: {id: request.params.iduser}})
        const idCategory = (await categoryContaRepository.findOne({
            where: {
                descricaoCategoryConta: request.body.descricaoCategoriaConta,
                userCategoryConta: user
            }
        }));

        if(idCategory == undefined) {
            return response.send({ error: "FindByName Não encontrado" });
        }

        return response.send({ idCategoryConta: idCategory.id });
    }       

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({where: {id: request.params.iduser}})

        if(user == undefined) {
            return response.send({error: "usuário não encontrado"})
        }

        const categoriesConta = await categoryContaRepository.find({where: {                
                userCategoryConta: user
            }
        })      

        return response.send({ categoriesConta });
    }       

    async edit(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);  
        const userRepository = getRepository(User);
        const { descricaoCategoryConta, iconeCategoryConta, userCategoryConta } = request.body;
        const id = parseInt(request.params.id);

        if (descricaoCategoryConta == '') return response.send({ error: "descrição em branco!" });
        if (userCategoryConta == null) return response.send({ error: "Sem Usuário!" });

        const categoryContaExists = await categoryContaRepository.find({
            where: { descricaoCategoryConta }
        });

        if (categoryContaExists.length > 1 || (categoryContaExists.length == 1 && categoryContaExists[0].id != (id))) {
            return response.send({ error: "Já existe uma categoria com essa descrição" });
        }
            
        const user = await userRepository.findOne({
            where: { id: userCategoryConta }
        });

        if (user == undefined) {
            return response.send({error: "User não encontrado"})
        }

        const newCategoryConta = request.body;
        newCategoryConta.userCategoryConta = user;
        await categoryContaRepository.update(id, newCategoryConta);

        const category = await categoryContaRepository.findOne({
            where: { id }
        });

        return response.send({message: category})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);
        let categoryContaToRemove = await categoryContaRepository.findOne(request.params.id);
        await categoryContaRepository.remove(categoryContaToRemove);
        return response.send({mes: 'foi'})
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const categoryContaRepository = getRepository(CategoryConta);
        let categoryContaToRemove = await categoryContaRepository.findOne();
        await categoryContaRepository.remove(categoryContaToRemove);
        return response.send({ mes: 'foi' });
    }  
}

export default new CategoryContaController;