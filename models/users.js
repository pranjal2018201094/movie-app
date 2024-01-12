const mongoose = require('mongoose');
const UserSchema = require('./schemas/users');

const { Model } = mongoose;

class User extends Model {
  static async getUser(email) {
    return this.findOne({
      email_id: email,
    });
  }
}

module.exports = mongoose.model(User, UserSchema, 'Users');

