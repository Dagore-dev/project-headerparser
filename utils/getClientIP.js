function getClientIP (request) {
  const forwarded = request.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : request.socket.remoteAddress

  return ip
}

module.exports = getClientIP
