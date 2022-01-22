module.exports = {
  readCollection: function(con, callback) {
    con.db('myblog').collection('d_artikel').find({}).toArray(callback);
  },
  readCollectionWithLimitDocumment: function(con, limit, skip, callback) {
    con.db('myblog').collection('d_artikel').find({}).limit(limit).skip(skip).toArray(callback);
  },
  readOneDocument: function(con, slug, callback) {
    con.db('myblog').collection('d_artikel').findOne({
      slug: slug
    }, callback);
  },
}