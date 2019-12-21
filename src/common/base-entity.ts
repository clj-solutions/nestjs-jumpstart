import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm'

export abstract class BaseEntity {
  constructor(fields = {}) {
    Object.assign(this, fields)
  }

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false
  })
  updatedAt: Date
}
