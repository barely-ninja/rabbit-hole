const http = require('http'),
connect = require('connect'),
proxy = require('http-proxy-middleware'),
conditional = require('conditional-middleware');

const proxyOptions = require('./options');

const app = connect()

function toGap (req) {
  const target = req.url.split('/')[1]
  return (target == 'gap')
}

app.use(conditional(toGap, [
  proxy(proxyOptions.gap)
]))

http.createServer(app).listen(8000);