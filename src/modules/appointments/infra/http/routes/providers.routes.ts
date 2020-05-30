import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const router = Router();
const providersController = new ProvidersController();

router.use(ensureAuthenticaded);

router.get('/', providersController.index);

export default router;
