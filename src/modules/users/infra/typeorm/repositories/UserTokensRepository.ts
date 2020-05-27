import { Repository, getRepository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

export default class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  public async findByUserToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken;
  }
}
