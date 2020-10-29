import { Router } from 'express';
import WebCompaniesController from './controllers/WebCompaniesController';
import WebUsersController from './controllers/WebUsersController';

const routes = Router();

// webCompany routes
routes.get("/app/webcompanies", WebCompaniesController.index);
routes.get("/app/webcompanies/:id", WebCompaniesController.show);
routes.post("/app/webcompanies", WebCompaniesController.create);

// webUser routes
routes.get("/app/webusers", WebUsersController.index);
routes.get("/app/webusers/:id", WebUsersController.show);
routes.post("/app/webusers", WebUsersController.create);

export default routes;