import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badRequest, ok } from '../../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../../errors';
import { EmailValidator } from '../../protocols/email-validator';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'));
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email);
    if (!isValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return ok({});
  }
}
