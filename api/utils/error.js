// error handler to handle errors
export const errorHandler = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};
