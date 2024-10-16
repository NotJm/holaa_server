import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { IncidentModule } from '../incident/incident.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../services/email.service';
import { PwnedService } from 'src/services/pwned.service';
import { ZxcvbnService } from 'src/services/zxcvbn.service';
import { HttpModule } from '@nestjs/axios';
import { AuthGateway } from './auth.gateway';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    }),
    IncidentModule
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, PwnedService, ZxcvbnService, AuthGateway],
})
export class AuthModule {}
