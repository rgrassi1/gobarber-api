import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const repository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(repository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
