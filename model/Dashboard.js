module.exports = {
  readCollectionByUser: function(con, user, callback) {
    con.db('myblog').collection('d_artikel').find({author:user}).sort({ _id: -1 }).toArray(callback);
  },
  insertOneCollection: function(con, data, callback) {
    const data_ = {
      judul: data.judul,
      thumbnail_url:data.thumbnail_url,
      slug:data.slug,
      rubrik:data.rubrik,
      prev_text:data.prev_text,
      content:data.content,
    }
    con.db('myblog').collection('d_artikel').insertOne(data_, callback);
  },
  updateCollection: function(con, data, slug, callback) {
    con.db('myblog').collection('d_artikel').updateOne({
      slug: slug
    }, {
      $set: {
        judul: data.judul,
        thumbnail_url:data.thumbnail_url,
        slug:data.slug,
        rubrik:data.rubrik,
        prev_text:data.prev_text,
        content:data.content,
        author:data.author,
        updated_at:today,
      }
    }, callback);
  },
  deleteCollection: function(con, slug, callback) {
    con.db('myblog').collection('d_artikel').deleteOne({
      slug: slug
    }, callback);
  },
}