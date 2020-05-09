import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const repository = new UsersRepository();

    const createUser = new CreateUserService(repository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  }
}
