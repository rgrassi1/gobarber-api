import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();
  try {
    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default router;
