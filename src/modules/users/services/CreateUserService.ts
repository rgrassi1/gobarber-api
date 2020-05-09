import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.repository = repository;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.repository.save(user);

    return user;
  }
}

export default CreateUserService;
