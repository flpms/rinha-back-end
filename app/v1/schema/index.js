'use strict';

const Pessoas = require('./pessoas');

module.exports = ({ Joi, genSchemaObj }) =>
  genSchemaObj([
    Pessoas(Joi)
  ])({
    post: {},
    get: {},
    patch: {},
    delete: {},
  });
