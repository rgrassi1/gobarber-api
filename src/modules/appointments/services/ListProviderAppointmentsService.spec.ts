import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointmentAt8 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointmentAt9 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointmentAt8, appointmentAt9]);
  });
});
