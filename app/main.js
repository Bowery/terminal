var cp = require('child_process')
var app = require('app')
var BrowserWindow = require('browser-window')

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit()
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadUrl('file://' + __dirname + '/term.min.html')
  mainWindow.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

var server = require('http').createServer(handler)
var io = require('socket.io')(server)
server.listen(3000)

function handler (req, res) {
  res.writeHead(200)
}

io.on('connection', function (socket) {
  var shell = cp.spawn('/bin/bash', ['-i', '-l'], {
    cwd: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
  })

  shell.stdout.on('data', function (data) {
    socket.emit('data', data)
  })

  shell.stderr.on('data', function (data) {
    socket.emit('data', data)
  })

  socket.on('data', function (data) {
    shell.stdin.write(data);
  })
})
