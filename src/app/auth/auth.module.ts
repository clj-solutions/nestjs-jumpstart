import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { JWT_SECRET } from './secret.key'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3h' }
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    Logger,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
