import { Router, response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticaded from '../middleware/ensureAuthenticaded';
import multer from 'multer';
import uploadConfig from '../config/upload';

const router = Router();

const upload = multer(uploadConfig);

router.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  try {
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

router.patch(
  '/avatar', 
  ensureAuthenticaded, 
  upload.single('avatar'), 
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({ 
        user_id: request.user.id, 
        avatarFileName: request.file.filename
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
    return response.json({ ok: true });
  },
);

export default router;
