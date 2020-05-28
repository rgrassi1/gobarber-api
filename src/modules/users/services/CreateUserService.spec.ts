import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const email = 'robert.ryan@mail.com';

    await createUserService.execute({
      name: 'Robert Ryan',
      email,
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Robert Ryan',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
