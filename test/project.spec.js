global.logger = console;
const chai = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { assert } = chai;
require('sinon-mongoose');
const proxyquire = require('proxyquire').noCallThru();

const { successResponse } = require('./mock-data');

const MovieModel = require('../models/movies');
const GenreModel = require('../models/genres');

describe('[Project]-Search-API', () => {
  let MovieModelMock;
  let GenreModelMock;
  let target;
  before(() => {
    MovieModelMock = sinon.mock(MovieModel);
    GenreModelMock = sinon.mock(GenreModel);
    target = proxyquire(
      '../controllers/project-controller',
      {
        MovieModel: MovieModelMock,
        GenreModel: GenreModelMock,
      },
    );
  });

  afterEach(() => {
    sinon.restore();
  });
  it('Should though validation error when invalid parameters are passed', async () => {
    const req = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      hostname: 'localhost',
      query: {
        test: 'abc',
      },
    };
    const res = httpMocks.createResponse({ });
    await target.search(req, res);
    const response = res._getData();
    console.log(response.message, '- - - ');
    assert.equal(res.statusCode, 400);
    assert.equal(response.message, '"test" is not allowed, "test" is not allowed');
  });

  it('Should return proper result when valid search parameter title is passed', async () => {
    const req = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      hostname: 'localhost',
      query: {
        page: 1,
        limit: 10,
        title: 'abc',
      },
    };
    const res = httpMocks.createResponse({ });
    MovieModelMock.expects('aggregate')
      .withArgs([
        {
          $match: {
            title: 'abc',
          },
        },
        {
          $lookup: {
            from: 'Genres',
            localField: '_id',
            foreignField: 'movie_id',
            as: 'genres',
          },
        },
      ])
      .chain('sort')
      .chain('skip')
      .chain('limit')
      .resolves(successResponse);
    await target.search(req, res);
    const response = res._getData();
    assert.equal(res.statusCode, 200);
    assert.equal(response.data, successResponse);
  });
});
