import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import WebCompany from '../models/WebCompany';
import WebCompanyView from '../views/WebCompaniesView';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response) {
        const webCompanyRepository = getRepository(WebCompany);

        const webCompanies = await webCompanyRepository.find();

        return response.json(WebCompanyView.renderMany(webCompanies));
    },

    async show(request: Request, response: Response) {
        const {id} = request.params;
        const webCompanyRepository = getRepository(WebCompany);
        
        const webCompany = await webCompanyRepository.findOneOrFail(id);
        return response.json(WebCompanyView.render(webCompany));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
            active
        } = request.body;
    
        const webCompanyRepository = getRepository(WebCompany);
    
        const data = {
            name,
            email,
            password,
            active
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório'),
            password: Yup.string().required('Password obrigatório'),
            active: Yup.boolean().required('Ativo obrigatório')
        })

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly: false,
        })

        const webCompany = webCompanyRepository.create(finalData);
    
        await webCompanyRepository.save(webCompany);
    
        return response.status(201).json(webCompany);
    }
};