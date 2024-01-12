const mongoose = require('mongoose');
const GenreSchema = require('./schemas/genres');

const { Model } = mongoose;

class Genre extends Model {
  static searchMovieIdsWithGenre(values) {
    const { page, limit, genre } = values;
    return this.find({
      name: genre,
    }).sort({ updated_at: -1 }).skip((page - 1) * limit).limit(limit);
  }

  static async addGenres(id, genres) {
    const data = genres.reduce((acc, genre) => {
      acc.push({
        name: genre,
        movie_id: id,
      });
      return acc;
    }, []);
    return this.insertMany(data);
  }
}

module.exports = mongoose.model(Genre, GenreSchema, 'Genres');

