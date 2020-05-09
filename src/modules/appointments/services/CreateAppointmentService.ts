import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  private repository: IAppointmentsRepository;

  constructor(repository: IAppointmentsRepository) {
    this.repository = repository;
  }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await this.repository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
