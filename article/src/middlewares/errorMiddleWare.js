const errorMiddleWare = (err, req, res, next) =>{
  console.log(err);
  res.send({ status: 500, message: "Unexpected Error"})
}

module.exports = errorMiddleWare