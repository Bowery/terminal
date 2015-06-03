var cp = require('child_process')

/**
 * Terminal represents a terminal session.
 */
function Terminal () {}

/**
 * shell represents a shell session.
 * @param {Object}
 */
Terminal.prototype.shell = null

/**
 * socket represents a socket.io web socket connection.
 * @param {Object}
 */
Terminal.prototype.socket = null

/**
 * packages represents the packages in use.
 * @param {Object}
 */
Terminal.prototype._packages = {}

/**
 * init spawns the shell and sets event handlers.
 */
Terminal.prototype.init = function () {
  this.shell = cp.spawn('/bin/bash', ['-i', '-l'], {
    cwd: process.env.HOME
  })

  this.shell.stdout.on('data', this.handleShellStdout.bind(this))
  this.shell.stderr.on('data', this.handleShellStderr.bind(this))
  this.socket.on('data', this.handleSocketEvent.bind(this))
  this.socket.on('error', this.handleSocketError.bind(this))
}

/**
 * handleShellStdout handles the shell's stdout
 * and emits it via the socket.
 * @param {Object} data
 */
Terminal.prototype.handleShellStdout = function (data) {
  this.socket.emit('data', data)
}

/**
 * handleShellStderr handles the shell's stderr
 * and emits it via the socket.
 * @param {Object} data
 */
Terminal.prototype.handleShellStderr = function (data) {
  this.socket.emit('data', data)
}

/**
 * handleSocketEvent handles incoming websocket data
 * and writes it to the shell's stdin.
 * @param {Object} data
 */
Terminal.prototype.handleSocketEvent = function (data) {
  this.shell.stdin.write(data)
}

/**
 * handleSocketError handles websocket errors.
 * @param {Object} err
 */
Terminal.prototype.handleSocketError = function (err) {
  console.log(err)
}

/**
 * setPackages sets packages.
 * @param {Object}
 */
Terminal.prototype.setPackages = function (packages) {
  this._packages = packages
}

/**
 * removePackage removes a package.
 * @param {String}
 */
Terminal.prototype.removePackage = function (name) {
  delete this._packages[name]
}

module.exports = Terminal
