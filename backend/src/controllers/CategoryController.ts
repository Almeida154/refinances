import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Category } from "../entities/Category";
import { User } from "../entities/User";

class CategoryController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const categoryRepository = getRepository(Category);
        const category = await categoryRepository.find();
        
        return response.send({ category });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const categoryRepository = getRepository(Category);
        const categories = await categoryRepository.createQueryBuilder("category")
            .leftJoinAndSelect("category.userCategory", "user")
            .getMany();

        return response.send({ categories });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const categoryRepository = getRepository(Category);  
        const userRepository = getRepository(User);
        const { nomeCategoria, tetoDeGastos, tipoCategoria, userCategory, iconeCategoria } = request.body;

        if (nomeCategoria == '') return response.send({ error: "nome em branco!" });

        if (tipoCategoria != 'receita' && tipoCategoria != 'despesa')
            return response.send({ error: "Não existe esse tipo" });
        
        
        if (userCategory == null) return response.send({
            error: "Sem Usuário!"
        });

        const user = await userRepository.findOne({
            where: { id: userCategory }
        });

        const categoryExists = await categoryRepository.find({
            where: { nomeCategoria, userCategory: user }
        });

        if (categoryExists.length > 0 )
            return response.send({ error: "Já existe uma categoria com esse nome" });

        const newCategory = request.body;
        newCategory.userCategory = user;
        const category = categoryRepository.create(newCategory);
        await categoryRepository.save(category);

        return response.send({ message: category });
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);

        const categories = await categoryRepository.createQueryBuilder("category")
            .leftJoinAndSelect("category.userCategory", "user")
            .where("category.id = :id", { id: request.params.id })
            .getMany();

        return response.send({ categories });
    }   

    async FindByName(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: request.params.iduser
            }
        });

        const idCategory = (await categoryRepository.findOne({
            where: { nomeCategoria: request.body.nomeCategoria, userCategory: user }
        }));

        if(!idCategory) {
            return response.send({error: `Não existe uma categoria com esse nome, nome inserido: ${request.body.nomeCategoria}`})
        }

        return response.send({ idCategory: idCategory.id });
    }   

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: request.params.iduser
            }
        })

        if(!user) {
            return response.send({error: "usuário não encontrado"})
        }

        
        let categories 

        if(request.body.tipoCategoria == 'todos') {
            categories = (await categoryRepository.find({
                where: {
                        userCategory: user 
                       }
                }));        
                
        } else {
            categories = (await categoryRepository.find({
                where: {
                        tipoCategoria: request.body.tipoCategoria,
                        userCategory: user 
                       }
                }));  
        }
         
        
        return response.send({ categories });
    }   

    async remove(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);
        let categoryToRemove = await categoryRepository.findOne(request.params.id);
        await categoryRepository.remove(categoryToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);
        let categoryToRemove = await categoryRepository.find();
        await categoryRepository.remove(categoryToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async edit(request: Request, response: Response, next: NextFunction) {
        const categoryRepository = getRepository(Category);
        const userRepository = getRepository(User);

        const id = parseInt(request.params.id);

        const { nomeCategoria, tetoDeGastos, tipoCategoria, essencial, userCategory } = request.body;

        if (nomeCategoria == '') return response.send({ error: "nome em branco!" });

        if (tipoCategoria != 'receita' && tipoCategoria != 'despesa')
            return response.send({ error: "Não existe esse tipo" });

        if (essencial == null) return response.send({ error: "Senha em branco!" });
        if (userCategory == null) return response.send({ error: "Sem Usuário!" });
        
        const categoryexists = await categoryRepository.find({ where: { nomeCategoria } });

        if (categoryexists.length > 1 || (categoryexists.length == 1 && categoryexists[0].id != (id)))
            return response.send({ error: "Nome já cadastrado" });

        const user = await userRepository.findOne({where: {id: userCategory}})
        const newCategory = request.body

        newCategory.userCategory = user
        await categoryRepository.update(id, newCategory)

        const updatedCategory = await categoryRepository.findOne({
            where: { id }
        });

        return response.send({ updatedCategory });
    }
}

export default new CategoryController;