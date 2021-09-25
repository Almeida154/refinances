import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import VerificaSeOEmailExiste from '../helpers/VerificaSeOEmailExiste';

class UserController {
    
    async index(request: Request, response: Response, next: NextFunction) {        
        return response.send({ userID: request.userId });
    }

    async all(request: Request, response: Response, next: NextFunction) {        
        const userRepository = getRepository(User);
        const user = await userRepository.find();
        return response.send({ user });
    }    

    async one(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where: {id: request.params.id}});
        return response.send({ user });
    }    

    async auth(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
       
        const { emailUsuario, senhaUsuario } = request.body;

        if (emailUsuario == '') return response.send({
            error: "Email em branco"
        });

        if (senhaUsuario == '') return response.send({
            error: "Senha em branco"
        });

        const user = await userRepository.findOne({
            where: { emailUsuario }
        });

        if (!user) return response.send({ error: "Email não encontrado!" });

        const isValidPassword = await bcrypt.compare(senhaUsuario, user.senhaUsuario);

        if (!isValidPassword) return response.send({ error: "Senha incorreta!" });

        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'})
        
        delete user.senhaUsuario;

        return response.send({
            user,
            token
        });
    }    

    async save(request: Request, response: Response, next: NextFunction) {                        
        const userRepository = getRepository(User);

        const { nomeUsuario, emailUsuario, senhaUsuario } = request.body;
        if (!VerificaSeOEmailExiste(emailUsuario)) return response.send({ error: "Formato de email inválido" });
        if (emailUsuario == '' || emailUsuario == undefined)
            return response.send({ error: "Digite seu email!" });
        if (senhaUsuario == '' || senhaUsuario == undefined)
            return response.send({ error: "Digite sua senha!" });
        
        const userexists = await userRepository.find({ where: { emailUsuario } });
        if (userexists.length > 0)
            return response.send({ error: "Email já cadastrado" });
        if (nomeUsuario == '' || nomeUsuario == undefined)
            return response.send({ error: "Nome não especificado" });
        
        const user = userRepository.create(request.body);
        await userRepository.save(user);

        return response.send({ message: user });
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const id = parseInt(request.params.id);

        const {nomeUsuario, emailUsuario, senhaUsuario, fotoPerfilUsuario} = request.body
        if (nomeUsuario == '') return response.send({ error: "Nome em branco!" });
        if (emailUsuario == '') return response.send({ error: "Email em branco!" });
        if (senhaUsuario == '') return response.send({ error: "Senha em branco!" });

        const userexists = await userRepository.find({
            where: { emailUsuario }
        });

        console.log(id);

        if (userexists.length > 1 || (userexists.length == 1 && userexists[0].id != (id)))
            return response.send({ error: "Email já cadastrado" });

        await userRepository.update(id, request.body);
        const updatedUser = await userRepository.findOne({ where: { id } });

        return response.send({ updatedUser });
    }
    
    async remove(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
        return response.send({ mes: 'foi' });
    }

    async removeAll(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.find();
        await userRepository.remove(userToRemove);
        return response.send({ mes: 'foi' });
    }
}

export default new UserController;