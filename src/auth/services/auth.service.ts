import { Injectable } from "@nestjs/common";
// import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.signinUser(username, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = {
      username: user._doc.name,
      sub: user._doc._id,
      isAdmin: user._doc.isAdmin,
      isSubAdmin: user._doc.isSubAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
