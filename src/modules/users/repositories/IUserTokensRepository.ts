import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensReposistory {
  generate(user_id: string): Promise<UserToken>;
  findByUserToken(token: string): Promise<UserToken | undefined>;
}
