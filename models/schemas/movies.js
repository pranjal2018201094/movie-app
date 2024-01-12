const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  streaming_link: {
    type: String,
    required: false,
  },
}, schemaOptions);

MovieSchema.index({ title: 1 }, { unique: true });

module.exports = MovieSchema;
