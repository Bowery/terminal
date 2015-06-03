var fs = require('fs')
var path = require('path')

function Package (path) {
  this._path = path
}

Package.prototype._path = ''

Package.prototype.config = {}

Package.prototype.module = null

Package.prototype.init = function () {
  var self = this
  var configPath = path.join(this._path, 'package.json')
  this.config = require(configPath)
  this.module = require(path.join(this._path, this.config.main))
}

var link = new Package(path.join(__dirname, 'link'))
link.init()
var packages = {
  'link': link
}

module.exports = packages
