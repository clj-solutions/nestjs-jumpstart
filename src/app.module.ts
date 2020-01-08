import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './app/user/user.module';
import { RouterModule, Routes } from 'nest-router';
import { AuthModule } from './app/auth/auth.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/users',
        module: UserModule
      }
    ]
  }
]

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(), 
    UserModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
