import { Router } from 'express';
import WebCompaniesController from './controllers/WebCompaniesController';

const routes = Router();

// webCompany routes
routes.get("/app/webcompanies", WebCompaniesController.index);
routes.get("/app/webcompanies/:id", WebCompaniesController.show);
routes.post("/app/webcompanies", WebCompaniesController.create);

export default routes;