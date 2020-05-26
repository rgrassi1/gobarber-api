import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.svg',
    });

    expect(user.avatar).toBe('avatar.svg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.svg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Robert Ryan',
      email: 'robert.ryan@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.svg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.svg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.svg');
    expect(user.avatar).toBe('avatar2.svg');
  });
});
