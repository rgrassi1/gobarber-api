import { Repository, getRepository, Not } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    return this.repository.find(
      except_user_id
        ? {
            where: {
              id: Not(except_user_id),
            },
          }
        : {},
    );
  }
}

export default UsersRepository;
