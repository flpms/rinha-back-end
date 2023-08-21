const Pessoas = require('./pessoas');

module.exports = dps => ({
  pessoasRepository: Pessoas(dps)
});