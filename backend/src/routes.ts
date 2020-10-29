import { Router } from 'express';

const routes = Router();

routes.get("/", (request, response) => response.json({msg: "Hello"}));
routes.get("/app", (request, response) => response.json({msg: "Hello Private"}));

export default routes;