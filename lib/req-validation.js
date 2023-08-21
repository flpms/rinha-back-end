const rqValidation = schema => {
  const validate = rq => Object.keys(schema)
    .map(it => (rq.data[it] = schema[it].validate(rq[it]),
      { err: rq.data[it].error })
    ).filter(i => !!i.err);

  return (rq, rs, nxt) => {
    const log = rq.method+' '+rq.path;
    rq.data = {};
    rq.start = Date.now();

    const errs = validate(rq);

    if (errs.length) {
      errs.map(({ err }) => console.error(err.message));
      console.log(log + ' 400');
      return rs.status(400).send({ message: 'Bad request' });
    }

    console.log(log);
    return nxt();
  };
};

module.exports = rqValidation;
