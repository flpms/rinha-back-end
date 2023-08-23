const PessoasPostController = require('./pessoas-post.controller');
const PessoaGetController = require('./pessoa-get.controller');
const PessoasGetController = require('./pessoas-get.controller');
const CountPessoasGetController = require('./count-pessoas-get.controller');
module.exports = deps => ({
  postPessoas: PessoasPostController(deps),
  getPessoa: PessoaGetController(deps),
  getPessoas: PessoasGetController(deps),
  getCountPessoas: CountPessoasGetController(deps),
})
