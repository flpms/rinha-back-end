const DefaultRootController = require('./root.controller');
const PessoasPostController = require('./pessoas-post.controller');
const PessoaGetController = require('./pessoa-get.controller');
const PessoasGetController = require('./pessoas-get.controller');

module.exports = deps => ({
  defaultRoot: DefaultRootController(deps),
  postPessoas: PessoasPostController(deps),
  getPessoa: PessoaGetController(deps),
  getPessoas: PessoasGetController(deps),
})
