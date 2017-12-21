const modifyResponse = require('http-proxy-response-rewrite');
const editPipeline = require('./pipeline');

const changes = {
  gap: [
    {
        from: /('|"|url\()(\/\w)/g,   
        to:'$1/gap$2',
    },
    {
        from: /('|"|url\()(Asset_Archive)/g,   
        to:'$1gap/$2',
    }
  ]
}

const options = {
  gap: {
      target: 'http://www.gap.com',
      pathRewrite: {
          '^/gap': '',
      },
      changeOrigin: true,
      logLevel: 'debug',
      onProxyRes: (proxyRes, req, res) =>{
        if ('location' in proxyRes.headers) {
            proxyRes.headers.location = proxyRes.headers.location.replace(/www\.gap\.com/, 'localhost:8000/gap')
          }
        
        const gapPipeline = editPipeline(changes.gap)
        ct = proxyRes.headers['content-type']
        if (ct && (ct.match('text')||ct.match('javascript'))) {
            modifyResponse(res, proxyRes.headers['content-encoding'], (body) => gapPipeline(body))
        }
      }
  }
}

module.exports = options;