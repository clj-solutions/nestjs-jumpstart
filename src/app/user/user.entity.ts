import { Entity, Column } from 'typeorm'
import { BaseEntity } from "../../common/base-entity"

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true
  })
  email: string

  @Column({ length: 100, nullable: true })
  passwordHash: string

  @Column()
  firstName: string

  @Column()
  lastName: string
}
