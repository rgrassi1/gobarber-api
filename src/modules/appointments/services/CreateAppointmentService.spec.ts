import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new repository', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      provider_id: '11333444',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11333444');
  });
});
