export function handleError(err, req, res, next){
  console.error(err)
  res.status(500).send({ok:false, messsage:'Server Error'})
}