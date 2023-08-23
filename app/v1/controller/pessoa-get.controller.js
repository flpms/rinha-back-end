const PessoaGetController = ({
  resHandler,
  repos: { pessoasRepository },
}) => async (rq, rs) => {
  const p = rq.data.params.value;
  const onRes = resHandler(rq, rs);
  try {
    const res = await pessoasRepository.findOne({
      id: p.id,
    });

    if (!res) {
      return onRes.NOT_FOUND({
        message: 'Pessoa não encontrada',
      });
    }

    return onRes.OK(res);
  } catch(err) {
    console.error(err);
    onRes.SERVICE_UNAVAILABLE({
      message: 'Erro ao processar requisição',
    });
  }
};

module.exports = PessoaGetController;
