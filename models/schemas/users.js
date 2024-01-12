const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'STANDARD'],
  },
  email_id: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },

}, schemaOptions);

UserSchema.index({ email_id: 1 });

module.exports = UserSchema;
