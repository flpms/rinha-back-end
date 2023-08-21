const DefaultRootController = require('./root.controller');
const PessoasPostController = require('./pessoas-post.controller');

module.exports = deps => ({
  defaultRoot: DefaultRootController(deps),
  postPessoas: PessoasPostController(deps),
})
