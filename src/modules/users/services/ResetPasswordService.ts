import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UserTokensRepository')
    private tokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.tokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.repository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const compareData = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareData)) {
      throw new AppError('Token is expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.repository.save(user);
  }
}
