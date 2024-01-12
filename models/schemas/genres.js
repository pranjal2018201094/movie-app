const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: 'movies',
    required: true,
  },
}, schemaOptions);
GenreSchema.index({ movie_id: 1, name: 1 }, { unique: true });


module.exports = GenreSchema;
