import { User } from './user.entity'
export const factory = require('factory-girl').factory

factory.define('user', User, {
  id: factory.sequence('user.id', (n) => n),
  email: factory.sequence('user.email', n => `dummy-user-${n}@test.com`),
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  passwordHash: ''
})