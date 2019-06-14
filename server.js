const http = require('http')

const { URL } = require('url');

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {  
  if (req.url === '/') return respondHello(req, res)
  if (req.url === '/user-agent') return respondUserAgent(req, res)
  if (req.url) return respondBase64Endpoint(req, res)
  res.end()
})

function respondHello (req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

function respondUserAgent (req, res) {
  const user_agent = req.headers['user-agent'];
    res.end(JSON.stringify({ user_agent }))
}

function respondBase64Endpoint (req, res) {

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
  if (pathname.startsWith('/base64/')) {
    const data = decodeURIComponent(pathname.substring(8));
    const encodedData = Buffer.from(data, 'utf-8').toString('base64');
    const urlEncodedData = encodeURIComponent(encodedData);
    res.end(JSON.stringify({ 'base64endpoint': urlEncodedData }));
  } else {
    res.end('The url should start with `/base64/`');
  }
}

server.listen(PORT)

console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
