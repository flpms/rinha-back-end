const PessoasPostController = ({
  resHandler,
  repos: { pessoasRepository },
  uuid,
}) => async (rq, rs) => {
  const p = rq.data.body.value;
  const onRes = resHandler(rq, rs);

  const nullField = Object.keys(p).filter(k => k !== 'stack' && !p[k]).length;
  if (!!nullField) return onRes.UNPROCESSABLE_ENTITY({
    message: 'Campos obrigatórios não preenchidos',
  });

  try {
    p.id = uuid.v4();
    const res = await pessoasRepository.insertOne(p);
    rs.location(`/pessoas/${p.id}`)
    return onRes.CREATED({
      message: 'Pessoa cadastrada com sucesso',
      data: res.ops.pop(),
   });
  } catch(e) {
    if (e.code === 11000) {
      return onRes.UNPROCESSABLE_ENTITY({
        message: 'Pessoa já cadastrada',
      });
    };
    console.error(e);
    onRes.SERVICE_UNAVAILABLE({
      message: 'Erro ao processar requisição',
    });
  }
};

module.exports = PessoasPostController;
