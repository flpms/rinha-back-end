const resHand = (rq, rs) => {
  const log = rq.method + ' ' + rq.path;
  return ({
    onError: (stCode, err) =>
      (console.log(log + ' ' + stCode + ' ' + err.message),
      rs.status(stCode)
        .json({ message: err.message })),
    onSuccess: (stCode, message) =>
    (console.log(log + ' ' + stCode + ' ' + (Date.now() - rq.start) + 'ms'),
        rs.status(stCode).send(message))
  });
};

const ResponseHandler = (rq, rs) => {
  const { onSuccess, onError } = resHand(rq, rs);
  return ({
    OK: message => onSuccess(200, message),
    CREATED: message => onSuccess(201, message),
    ACCEPTED: message => onSuccess(202, message),
    NOT_FOUND: message => onError(404, message),
    BAD_REQUEST: message => onError(400, message),
    UNPROCESSABLE_ENTITY: message => onError(422, message),
    SERVICE_UNAVAILABLE: message => onError(503, message),
  });
};


module.exports = ResponseHandler;
