'use strict';

const rootDir = process.cwd();
const category = require(`${rootDir}/src/models/category.js`);

const supergoose = require('../supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('category model', () => {
  it('can post() a new category', () => {
    let obj = {
      name: 'winter clothing',
      description: 'Mens and womens clothing',
      seasonal:true,
    }

    return category.post(obj)
      .then(record => {
        expect(record.name).toEqual(obj.name);
        expect(record.description).toEqual(obj.description);
        expect(record.seasonal).toEqual(obj.seasonal);
      })
      .catch(e => console.error('ERR', e) );
  });

  it('can get() a category by id', (done) => {

    let obj = {
      name: 'winter clothing',
      description: 'Mens and womens clothing',
      seasonal:true,
    }
    return category.post(obj)
      .then(record => {
        return category.get(record._id)
          .then(category => {
            expect(category[0].name).toEqual(obj.name);
            expect(category[0].description).toEqual(obj.description);
            expect(category[0].seasonal).toEqual(obj.seasonal);
            done();
          });
      });

  });

  it('can update a category', () => {

    let obj = {
      name: 'mixed weather clothing',
      description: 'Mens and womens clothing',
      seasonal:true,
    }
    return category.get()
      .then(record => {
        return category.put(record[0]._id, obj)
          .then( result => {
            expect(result.name).toEqual(obj.name);
          })
      });
  });

  it('can delete a category', () => {

    let id; 

    return category.get()
      .then(record => {
        id = record[0]._id;
        return category.delete(id)
          .then( result => {
            expect(result._id).toEqual(id);
            return category.get(id)
              .then( result => {
                expect(result).toEqual([]);
              })
          })
      });
  });
  
});