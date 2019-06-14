const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-port-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(`${urlBase}`, (err, body) => {
    if (err) t.error(err)
    t.equal(body.msg, 'hello');
    t.end()
  })
})

tape('should respond user-agent', (t) => {
  const options = { headers: { 'User-Agent': 'tape' } }
  jsonist.get(`${urlBase}/user-agent`, options, (err, body) => {
    if (err) t.error(err)
    t.equal(body.user_agent, 'tape');
    t.end()
  })
})


tape('should respond aGVsbG8%3D', (t) => {
  jsonist.get(`${urlBase}/base64/hello`, (err, body) => {
    if (err) t.error(err)
    t.equal(body.base64endpoint, 'aGVsbG8%3D');
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
