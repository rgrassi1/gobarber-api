import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  private repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticared users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.repository.save(user);

    return user;
  }
}
