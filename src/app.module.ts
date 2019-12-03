import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './app/user/user.module';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
  {
    path: '/v1',
    children: [
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
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
