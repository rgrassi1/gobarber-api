import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsControllers';

const router = Router();

const sessionsController = new SessionsController();

router.post('/', sessionsController.create);

export default router;
