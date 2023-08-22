const PessoaGetController = ({
  resHandler,
  repos: { pessoasRepository },
}) => async (rq, rs) => {
  const onRes = resHandler(rq, rs);
  const {t} = rq.data.query.value;
  try {
    const res = await pessoasRepository.find({
      $or: [
        { nome: { $regex: t, $options: 'i' } },
        { stack: { $regex: t, $options: 'i' } },
        { apelido: { $regex: t, $options: 'i' } },
      ],
    });

    if (!res.length) {
      console.log('empty return');
      return onRes.OK([]);
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
