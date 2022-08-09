import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from './schemas/user.schema';
import { AdminController } from './controller/admin.controller';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
// import { UserController } from './controller/user.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { ResourcesService } from 'src/resources/resources.service';
// import { AuthServiceO } from 'src/auth/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'user', schema: userSchema }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserService, 
    AuthService,
     ResourcesService
  ],
  controllers: [
    AdminController, 
    // UserController
  ],
  exports: [UserService],
})
export class UserModule {}
