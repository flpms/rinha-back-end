const PessoasPostController = ({
  resHandler,
  repos: { pessoasRepository }
}) => async (rq, rs) => {
  const p = rq.data.body.value;
  const onRes = resHandler(rq, rs);
  try {
    p.creationDate = Date.now();
    const result = await pessoasRepository.insertOne(p);
    return onRes.OK({
      message: 'Pessoa cadastrada com sucesso',
      data: result.ops.pop(),
   });
  } catch(err) {
    console.log(err);
    onRes.SERVICE_UNAVAILABLE({
      message: 'Erro ao processar requisição',
    });
  }
};

module.exports = PessoasPostController;
