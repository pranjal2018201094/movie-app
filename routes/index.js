const ProjectController = require('../controllers/project-controller');
const Middleware = require('../middleware');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

router.get('/movies', Middleware.validate, ProjectController.list);
router.get('/search', Middleware.validate, ProjectController.search);
router.post('/movies', Middleware.validate,jsonParser, ProjectController.add);
router.put('/movies/:id', Middleware.validate, jsonParser, ProjectController.update);
router.delete('/movies/:id', Middleware.validate, ProjectController.delete);

module.exports = router;

