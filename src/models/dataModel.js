'use strict';
  /**
   * A model for generic models.
   */
class DataModel {

  constructor(schema) {
    this.schema = schema;
  }
  /**
   * Get one or get many
   * @param {string} _id
   * @returns Resolved promise with data
   * @memberof DataModel
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }
  /**
   * Post one record
   * @param {object} record
   * @returns Resolved promise with the record
   * @memberof DataModel
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
   * Update one record
   * @param {string} _id
   * @param {object} record
   * @returns Resolved promise with the record, or empty object if nonexistent
   * @memberof DataModel
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }
  /**
   * Delete one record
   * @param {string} _id
   * @param {object} record
   * @returns Empty object
   * @memberof DataModel
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = DataModel;
