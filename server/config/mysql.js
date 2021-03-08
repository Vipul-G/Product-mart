const mysql = require('mysql2/promise');

function connectDb(callback) {
  mysql.createConnection({
    host:'localhost', user: 'root',
    database: 'product_mart',
    password: 'admin'
  })
  .then((connection) => {
    console.log('Database connected');
    callback(connection)
  })
  .catch((err) => {
    console.log({err})
    throw err;
  });
}

module.exports = connectDb



