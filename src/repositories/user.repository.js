import { User } from '../models/user.model.js'

export class UserRepository {
  static findUserByEmail(email) {
    return User.findOne({ email })
  }

  static findUserById(id) {
    return User.findById(id)
  }

  static createUser(userData) {
    return User.create(userData)
  }
}
