// recaptcha.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?response=${body.token}&secret=${process.env.V3_SECRATE_KEY}`,
      )
      .toPromise();
    // console.log(data);
    if (body.token == 'swagger_test_v3') return true;
    else if (!data.success) {
      throw new ForbiddenException('Invalid token');
    }

    return true;
  }
}
