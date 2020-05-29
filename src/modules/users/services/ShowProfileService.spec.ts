import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Robert Ryan');
    expect(profile.email).toBe('robert.ryan@mail.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
