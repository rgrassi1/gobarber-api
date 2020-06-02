import { Router } from 'express';
import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

router.use(ensureAuthenticaded);

router.post('/', appointmentsController.create);
router.get('/me', providerAppointmentsController.index);

export default router;
