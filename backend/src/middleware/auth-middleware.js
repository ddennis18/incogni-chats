import jwt from 'jsonwebtoken'

export function verifyToken (req, res, next) {
  //get the auhtorisation header
  const authHeader = req.header('Authorization')
  if (!authHeader) {
    return res.status(403).send({ ok: false, messsage: 'unauthorised' })
  }

  //extract token
  const token = authHeader.split(' ')[1];

  //verify it
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user)=>{
    if(err){
      return res.status(403).send({ok: false, messsage: 'unauthorised expired token'})
    }

    //so the user id would be in the req
    req.user = user;
    next();
  })
}
