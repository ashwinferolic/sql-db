const errorHandler = (err, req, res, next) => {
  let errorStatus = err.statusCode || 500;
  let errMessage = err.message || "something went wrong";
  res.status(errorStatus).json({
    status: errorStatus,
    error_message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : [],
  });
};

module.exports = { errorHandler };
