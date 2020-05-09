import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();

router.use(ensureAuthenticaded);

/* router.get('/', async (request, response) => {
  const appointments = await repository.find();

  return response.json(appointments);
}); */

router.post('/', appointmentsController.create);

export default router;
