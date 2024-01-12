const mongoose = require('mongoose');
const MovieSchema = require('./schemas/movies');

const { Model } = mongoose;


class Movie extends Model {
  static async getAllMovies() {
    return this.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: 'Genres',
          localField: '_id',
          foreignField: 'movie_id',
          as: 'genres',
        },
      },
    ]);
  }

  static async searchMovies(values, movieList) {
    const movieIds = movieList.map(movie => movie.movie_id);
    const { page, limit, title } = values;
    const query = {};
    if (movieIds.length) {
      query._id = { $in: movieIds };
    }
    if (values.title) {
      query.title = title;
    }
    return this.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'Genres',
          localField: '_id',
          foreignField: 'movie_id',
          as: 'genres',
        },
      },
    ]).sort({ updated_at: -1 }).skip((page - 1) * limit).limit(limit);
  }

  static async addMovies(values) {
    return this.create({
      title: values.title,
      rating: values.rating,
      streaming_link: values.streaming_link,
    });
  }
}

module.exports = mongoose.model(Movie, MovieSchema, 'Movies');

