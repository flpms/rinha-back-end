const CountPessoasGetController = ({
  resHandler,
  repos: { pessoasRepository },
}) => async (rq, rs) => {
  const onRes = resHandler(rq, rs);
  try {
    const total = await pessoasRepository.countDocuments();
    return rs.send(`${total}`);
  } catch (err) {
    console.error(err);
    onRes.SERVICE_UNAVAILABLE({
      message: 'Erro ao processar requisição',
    });
  }
};

module.exports = CountPessoasGetController;