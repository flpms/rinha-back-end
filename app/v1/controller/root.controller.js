const DefaultRootController = ({
  resHandler,
}) => (rq, rs) => {
  const msg = 'It\'s working! It\'s working!';
  const onRes = resHandler(rq, rs);
  console.log(msg);
  return onRes.OK({
    message: msg,
    url: 'https://giphy.com/gifs/9K2nFglCAQClO',
  });
};

module.exports = DefaultRootController;
