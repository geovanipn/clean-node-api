import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { AccountRepository } from '../../infra/db/mongodb/repositories/account/account-repository';
import { Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import { LogRepository } from '../../infra/db/mongodb/repositories/log/log-repository';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountRepository = new AccountRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  const logRepository = new LogRepository();
  return new LogControllerDecorator(signUpController, logRepository);
};
