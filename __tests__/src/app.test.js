'use strict';

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const {server} = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/api/v1/notes/12')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /api/v1/product', () => {

    return mockRequest
      .get('/api/v1/product')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

  it('should be able to post to /api/v1/product', () => {

    let obj = {
      name: 'Winter Jacket',
      category: 'winter clothing',
      color:'orange',
      price: 90,
      brand:'Colombia'
    };
    return mockRequest
      .post('/api/v1/product')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      });

  });

  it('should be able to post to /api/v1/category', ()  => {
    let obj = {
      name: 'winter clothing',
      description: 'Mens and womens clothing',
      seasonal: true,
    };

    return mockRequest
      .post('/api/v1/category')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.description).toEqual(obj.description);
      });

  });


  it('following a post to category, should find a single record', () => {

    let obj = {
      name: 'winter clothing',
      description: 'Mens and womens clothing',
      seasonal: true,
    };

    return mockRequest
      .post('/api/v1/category')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/category/${results.body._id}`)
          .then(list => {
            expect(list.status).toBe(200);
            expect(list.body.name).toEqual(obj.name);
          });
      });

  });

});
