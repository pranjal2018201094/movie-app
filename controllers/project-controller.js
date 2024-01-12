const ProjectValidator = require('../validator/project-validator');
const ProjectHelper = require('../helpers/project-helper');

class ProjectController {
  static async list(req, res) {
    try {
      const result = await ProjectHelper.getAllMovies();
      res.status(200).send({ data: result });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async search(req, res) {
    try {
      const { query } = req;
      const searchValidator = new ProjectValidator('search');
      const validator = searchValidator.validate(query);
      if (validator.error) {
        res.status(400).send(validator.error);
      } else {
        const result = await ProjectHelper.searchMovies(validator.value);
        res.status(200).send({ data: result });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async add(req, res) {
    try {
      const { body, currentUser } = req;
      if (currentUser.role !== 'ADMIN') {
        res.sendStatus(403);
      } else {
        const searchValidator = new ProjectValidator('add');
        const validator = searchValidator.validate(body);
        if (validator.error) {
          res.status(400).send(validator.error);
        } else {
          await ProjectHelper.addMovie(validator.value);
          res.sendStatus(204);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      const { body, params, currentUser } = req;
      if (currentUser.role !== 'ADMIN') {
        res.sendStatus(403);
      } else {
        const searchValidator = new ProjectValidator('update');
        const validator = searchValidator.validate({ ...body, id: params.id });
        if (validator.error) {
          res.status(400).send(validator.error);
        } else {
          await ProjectHelper.updateMovies(validator.value);
          res.sendStatus(204);
        }
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      const { currentUser, params } = req;
      if (currentUser.role !== 'ADMIN') {
        res.sendStatus(403);
      } else if (!params.id) {
        res.status(400).send('Movie-Id is required');
      } else {
        await ProjectHelper.deleteMovies(params);
        res.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = ProjectController;
