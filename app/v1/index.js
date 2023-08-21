'use strict';

const rtJSON = require('./routes.json');

const Controll = require('./controller');
const Repos = require('./repositories');
const Schemas = require('./schema');

const routes = deps => {
  const { rtProcessor, ...depens } = deps;

  return ({
    v1: rtProcessor({
      schemas: Schemas(depens),
      controll: Controll({
        ...depens,
        repos: Repos(depens),
      }),
      ...depens,
    })(rtJSON),
  });
};

module.exports = routes;
