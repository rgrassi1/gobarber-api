import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const repository = new UsersRepository();

    const createSession = new CreateSessionService(repository);

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
