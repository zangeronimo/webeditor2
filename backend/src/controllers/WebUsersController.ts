import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import WebUser from '../models/WebUser';
import WebUserView from '../views/WebUsersView';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response) {
        const webUserRepository = getRepository(WebUser);

        const webUsers = await webUserRepository.find({
            relations: ['webCompany']
        });

        return response.json(WebUserView.renderMany(webUsers));
    },

    async show(request: Request, response: Response) {
        const {id} = request.params;
        const webUserRepository = getRepository(WebUser);
        
        const webUser = await webUserRepository.findOneOrFail(id, {
            relations: ['webCompany']
        });
        return response.json(WebUserView.render(webUser));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
            active,
            webCompany
        } = request.body;
    
        const webUserRepository = getRepository(WebUser);
    
        const data = {
            name,
            email,
            password,
            active,
            webCompany
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório'),
            password: Yup.string().required('Password obrigatório'),
            active: Yup.boolean().required('Ativo obrigatório'),
            webCompany: Yup.object().required('Empresa obrigatório')
        })

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly: false,
        })

        const webUser = webUserRepository.create(finalData);
    
        await webUserRepository.save(webUser);
    
        return response.status(201).json(webUser);
    }
};