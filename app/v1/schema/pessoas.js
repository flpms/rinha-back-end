const PessoasBody = j => j.object({
  apelido: j.string().max(23).allow(null).required(),
  nome: j.string().max(100).allow(null).required(),
  nascimento: j.date().format('YYYY-MM-DD').allow(null).required(),
  stack: j.array().items(j.string().max(32)).allow(null).optional(),
});

const PessoaParams = j => j.object({
  id: j.string().guid({
    version: ['uuidv4']
  }).required(),
});

const PessoasQuery = j => j.object({
  t: j.string().required(),
});

module.exports = J => ({
  postPessoas: {
    post: {
      body: PessoasBody(J)
    }
  },
  getPessoa: {
    get: {
      params: PessoaParams(J)
    }
  },
  getPessoas: {
    get: {
      query: PessoasQuery(J)
    }
  }
})