import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { MasterSettingModule } from './masterSetting/masterSetting.module';
import { CmsModule } from './cms/cms.module';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/client/',
    }),

    UserModule,
    AuthModule,
    ResourcesModule,
    // MasterSettingModule,
    // CmsModule,
    // HospitalModule,
  ],
  controllers: [],
})
export class AppModule {}
