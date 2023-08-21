const PessoasBody = j => j.object({
  apelido: j.string().max(23).required(),
  nome: j.string().max(100).required(),
  nascimento: j.date().required(),
  stack: j.array().items(j.string().max(32)).allow(null).optional(),
});

const PessoasParams = j => j.object({
  id: j.number().integer().required()
});

module.exports = J => ({
  postPessoas: {
    post: {
      body: PessoasBody(J)
    }
  },
  getPessoas: {
    get: {
      params: PessoasParams(J)
    }
  }
})