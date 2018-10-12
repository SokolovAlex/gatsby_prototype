const StaticServer = require('static-server');
const { normalize } = require('path');

const server = new StaticServer({
  rootPath: normalize(`${__dirname}/../../content/data`),
  port: 9999,
  cors: '*',
});

server.start(() => {
  console.log('Server listening to', server.port);
});
