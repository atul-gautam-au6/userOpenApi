import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${jwtConstants.secret}`,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          console.log('token : -', data);

          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload: any) {
    if (!payload.isAdmin || payload.isSubAdmin) {
      throw new UnauthorizedException('You are not admin');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
