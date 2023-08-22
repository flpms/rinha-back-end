
console.log('service start');
const http = require('http');
const exp = require('express');
const DB = require('simple-connection');

const Joi = require('joi');
const dtenv = require('dotenv');
const uuid = require('uuid');

const Router = require('express').Router;

const routes = require('./app/v1/index.js');

const cors = require('./lib/cors');
const resHandler = require('./lib/res-handler');
const rqValidation = require('./lib/req-validation');
const rtProcessor = require('./lib/route-processor');
const genSchemaObj = require('./lib/gen-schema-obj');

dtenv.config();

console.log('DBConn', process.env.DB_SRVR + '/' +process.env.DB_NAME);
const deps = {
  db: new DB({
    protocol: 'mongodb://',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SRVR,
    database_name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  }),
  collsNm: {
    pessoas: 'pessoas',
  },
  Joi,
  router: new Router(),
  resHandler,
  rqValidation,
  rtProcessor,
  genSchemaObj,
  uuid,
}

const apiInst = exp();

const { v1 } = routes(deps);

apiInst.use(exp.json({ limit: '20kb' }));
apiInst.use(exp.urlencoded({ extended: true }));

apiInst.use(cors);
apiInst.use(v1);

apiInst.use((req, rs, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `not path request path ${JSON.stringify(req.path)}`;
  return next(err);
});

apiInst.use((err, rq, res) =>
  res.status(err.status || 500).send(err.message));

const server = http.createServer(apiInst);
server.listen(process.env.PORT || 3000);
server.on('error', console.error);
process.on('error', console.error);

{
  console.info(`Node Version - ${process.version}`);
  console.info('version - v1');
  console.log('STARTED')
}