function Link () {}

Link.prototype.handleStdout = function (data) {
  console.log('got data :)')
}

module.exports = new Link()
