import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import FakeHasProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHasProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHasProvider();

    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new session', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'robert.ryan@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    await expect(
      createSession.execute({
        email: 'robert.ryan@mail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
