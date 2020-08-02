import { Factory } from 'fishery'
import { internet, name } from 'faker'
import { User } from './user.entity'

export default Factory.define<User>(
  ({sequence}) => {
    return {
      id: sequence,
      email: internet.email(),
      firstName: name.firstName(),
      lastName: name.lastName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash: ""
    }
  }
)
