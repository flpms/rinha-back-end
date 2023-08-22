const PessoasPostController = ({
  resHandler,
  repos: { pessoasRepository },
  uuid,
}) => async (rq, rs) => {
  const p = rq.data.body.value;
  const onRes = resHandler(rq, rs);
  try {
    p.creationDate = Date.now();
    p.id = uuid.v4();
    const res = await pessoasRepository.insertOne(p);
    rs.location(`/pessoas/${p.id}`)
    return onRes.CREATED({
      message: 'Pessoa cadastrada com sucesso',
      data: res.ops.pop(),
   });
  } catch(err) {
    console.log(err);
    if (err.code === 11000) {
      return onRes.UNPROCESSABLE_ENTITY({
        message: 'Pessoa já cadastrada',
      });
    };

    onRes.SERVICE_UNAVAILABLE({
      message: 'Erro ao processar requisição',
    });
  }
};

module.exports = PessoasPostController;
