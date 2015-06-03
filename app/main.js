var app = require('app')
var BrowserWindow = require('browser-window')
var Menu = require('menu')
var Terminal = require('./Terminal')
var packages = require('./packages')
var terminal

require('crash-reporter').start()

var mainWindow = null
var template = [
  {
    label: 'Terminal'
  },
  {
    label: 'Developer',
    submenu: [
      {
        label: 'Show Packages',
        click: function() {
          showPackages()
        }
      }
    ]
  }
]

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit()
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadUrl('file://' + __dirname + '/term.min.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

var server = require('http').createServer(handler)
var io = require('socket.io')(server)
server.listen(3000)

function handler (req, res) {
  res.writeHead(200)
}

io.on('connection', function (socket) {
  terminal = new Terminal()
  terminal.setPackages(packages)

  terminal.socket = socket
  terminal.init()
})

function showPackages() {
  var detail = ''
  for (var pkg in terminal._packages)
    detail += pkg + '\n'

  require('dialog').showMessageBox(mainWindow, {
    type: 'info',
    buttons: ['Ok'],
    title: 'Packages',
    message: 'Active Packages',
    detail: detail
  })
}
