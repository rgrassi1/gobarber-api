import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new repository', async () => {
    const appointment = await createAppointment.execute({
      provider_id: '11333444',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11333444');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const date = new Date();

    await createAppointment.execute({
      provider_id: '11333444',
      date,
    });

    expect(
      createAppointment.execute({
        provider_id: '11333444',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
