import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'

export const TYPEORM_MODULE_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: "nest",
  password: "password",
  database: "nestjs",
  entities: [path.join(__dirname, '../**', '*.entity{.ts,.js}')],
}