import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { In } from 'typeorm'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}