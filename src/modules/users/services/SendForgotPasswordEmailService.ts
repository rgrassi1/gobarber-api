import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private tokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.tokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
