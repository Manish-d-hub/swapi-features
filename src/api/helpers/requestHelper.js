const handleResponse = ({
  res,
  statusCode = 200,
  msg = 'Success',
  data = {},
  result = 1,
  total = 1,
}) => {
  res.status(statusCode).send({ result, total, msg, data });
};

const handleError = ({
  res,
  statusCode = 500,
  err = 'Error',
  result = 0,

  data = {},
}) => {
  console.error(err instanceof Error ? err.message : err.msg || err);
  res.status(statusCode).send({
    result,
    msg: err instanceof Error ? err.message : err.msg || err,
    data: data instanceof Error ? data.message : data.msg || data,
  });
};

export { handleResponse, handleError };
