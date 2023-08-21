module.exports = (rq, rs, nxt) => {
  rs.header('Access-Control-Allow-Origin', '*');
  rs.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  rs.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  ('OPTIONS' === rq.method) ? rs.status(204).send() : nxt();
};
