'use strict';

module.exports = {
  getCategory: function(con, callback) {
    con.db('myblog').collection('s_category').find({}).toArray(callback);
  }
}