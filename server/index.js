const connectDb = require('./config/mysql');

connectDb((connection) => {
  const dbConnection = connection
  module.exports = dbConnection
  const app = require('./config/express');
  const config = require('./config');
  require('./schema')

  app.listen(config.port, () => {
    console.log('server started on port ' + config.port + ` (${config.env})`);
  })
})





