const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin_auth:123@cluster0.vkezg.mongodb.net/myblog?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};
run().catch(console.dir);
module.exports = {
  client
}