const MovieModel = require('../models/movies');
const GenreModel = require('../models/genres');
const utils = require('../helpers/utils');

class ProjectHelper {
  static async getAllMovies() {
    return MovieModel.getAllMovies();
  }

  static async searchMovies(input) {
    const {
      page, limit, genre, title,
    } = input;
    let movieList = [];
    let result;
    if (genre) {
      const cachedResult = utils.getCache(`${page}-${limit}-${genre}`);
      if (cachedResult) {
        result = cachedResult;
      } else {
        movieList = await GenreModel.searchMovieIdsWithGenre({ page, limit, genre });
        result = await MovieModel.searchMovies(input, movieList);
        utils.setCache(`${page}-${limit}-${genre}`, result);
      }
    } else if (title) {
      const cachedResult = utils.getCache(`${page}-${limit}-${title}`);
      if (cachedResult) {
        result = cachedResult;
      } else {
        result = await MovieModel.searchMovies(input, []);
        utils.setCache(`${page}-${limit}-${title}`, result);
      }
    }
    return result;
  }

  static async addMovie(input) {
    try {
      const result = await MovieModel.addMovies(input);
      await GenreModel.addGenres(result._id, input.genre);
      utils.clearData();
    /*
        Ideal way is to delete the cache for results which got affected due to query
        and insert new results to cache
    */
    } catch (error) {
      throw error;
    }
  }

  static async updateMovies(input) {
    utils.delWithKey(input.genre);
    utils.delWithKey(input.title);
    const result = await MovieModel.updateOne({
      _id: input.id,
    }, {
      ...(input.title ? { title: input.title } : {}),
      ...(input.rating ? { rating: input.rating } : {}),
      ...(input.streaming_link ? { streaming_link: input.streaming_link } : {}),
    });
    if (!result.nModified) {
      return false;
    }
    if (input.genre) {
      await GenreModel.remove({
        movie_id: input.id,
      });
      await GenreModel.addGenres(input.id, input.genre);
    }
    utils.clearData();
    /*
        Ideal way is to delete the cache for results which got affected due to query
        and insert new results to cache
    */
    return true;
  }

  static async deleteMovies(input) {
    await MovieModel.remove({
      _id: input.id,
    });
    await MovieModel.remove({
      movie_id: input.id,
    });
    utils.clearData();
    /*
        Ideal way is to delete the cache for results which got affected due to query
        and insert new results to cache
    */
  }
}

module.exports = ProjectHelper;
