import { Router } from 'express';
import multer from 'multer';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import uploadConfig from '@config/upload';

const router = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

router.post('/', usersController.create);

router.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update,
);

export default router;
