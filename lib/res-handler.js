const resHand = (_, rs) => ({
  onE: (stC, e) => rs.status(stC)
      .json({ message: e.message }),
  onS: (stC, m) => rs.status(stC).send(m)
});
const ResponseHandler = (rq, rs) => {
  const { onS, onE } = resHand(rq, rs);
  return ({
    OK: m => onS(200, m),
    CREATED: m => onS(201, m),
    ACCEPTED: m => onS(202, m),
    NOT_FOUND: m => onE(404, m),
    BAD_REQUEST: m => onE(400, m),
    UNPROCESSABLE_ENTITY: m => onE(422, m),
    SERVICE_UNAVAILABLE: m => onE(503, m),
  });
};
module.exports = ResponseHandler;
