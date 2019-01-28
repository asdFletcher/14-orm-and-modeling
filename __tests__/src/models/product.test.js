'use strict';

const rootDir = process.cwd();
const product = require(`${rootDir}/src/models/product.js`);

const supergoose = require('../supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('product model', () => {
  it('can post() a new product', () => {
    let obj = {
      name:'Winter Jacket',
      category:'winter clothing',
      color:'orange',
      price:90,
      brand:'Colombia',
    }

    return product.post(obj)
      .then(record => {
        expect(record.name).toEqual(obj.name);
        expect(record.category).toEqual(obj.category);
        expect(record.color).toEqual(obj.color);
      })
      .catch(e => console.error('ERR', e) );
  });

  it('can get() a product by id', (done) => {

    let obj = {
      name:'Winter Jacket',
      category:'winter clothing',
      color:'orange',
      price:90,
      brand:'Colombia',
    }
    return product.post(obj)
      .then(record => {
        return product.get(record._id)
          .then(product => {
            expect(product[0].name).toEqual(obj.name);
            expect(product[0].category).toEqual(obj.category);
            expect(product[0].color).toEqual(obj.color);
            done();
          });
      });

  });

  it('can update a product', () => {

    let obj = {
      name:'Winter Jacket',
      category:'winter clothing',
      color:'black',
      price:90,
      brand:'Colombia',
    }
    return product.get()
      .then(record => {
        return product.put(record[0]._id, obj)
          .then( result => {
            expect(result.color).toEqual(obj.color);
          })
      });
  });

  it('can delete a product', () => {

    let id; 

    return product.get()
      .then(record => {
        id = record[0]._id;
        return product.delete(id)
          .then( result => {
            expect(result._id).toEqual(id);
            return product.get(id)
              .then( result => {
                expect(result).toEqual([]);
              })
          })
      });
  });
  
});