import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHasProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateSession', () => {
  it('should be able to create a new session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHasProvider = new FakeHasProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHasProvider,
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHasProvider,
    );

    const user = await createUserService.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHasProvider = new FakeHasProvider();

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHasProvider,
    );

    await expect(
      createSession.execute({
        email: 'robert.ryan@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHasProvider = new FakeHasProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHasProvider,
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHasProvider,
    );

    await createUserService.execute({
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
