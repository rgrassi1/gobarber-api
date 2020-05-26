import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fake/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to create a new user', async () => {
    await fakeUsersRepository.create({
      name: 'Lee Marvin',
      email: 'lee.marvin@email.com',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmail.execute({
      email: 'lee.marvin@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'lee.marvin@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate forgot password token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lee Marvin',
      email: 'lee.marvin@email.com',
      password: '123456',
    });

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmail.execute({
      email: 'lee.marvin@email.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
