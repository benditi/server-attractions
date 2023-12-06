async function log(req:any, res:any, next:any) {
  if (req.session && req.session.user) {
    console.log('Req from: ' + req.session.user.fullname)
  }
  next()
}

export default 
  log

