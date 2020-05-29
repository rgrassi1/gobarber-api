import { Router } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const router = Router();

const profileController = new ProfileController();

router.use(ensureAuthenticaded);

router.put('/', profileController.update);
router.get('/', profileController.show);

export default router;
