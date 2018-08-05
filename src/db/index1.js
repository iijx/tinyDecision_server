const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const DB_HOST = ENV.DB_HOST;
const DB_NAME = ENV.DB_NAME;

// Use connect method to connect to the server
const connect = () => {
    MongoClient.connect(DB_HOST, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
    
      const db = client.db(DB_NAME);
    
      client.close();
    });
}

module.exports = {
    connect,
}