import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const router = Router();

const repository = new AppointmentsRepository();

router.get('/', (request, response) => {
  const appointments = repository.findAll();

  return response.json(appointments);
});

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentInSameDate = repository.findByDate(parsedDate);

  if (appointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = repository.create({ provider, date: parsedDate });

  return response.json(appointment);
});

export default router;
