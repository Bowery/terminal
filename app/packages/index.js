var fs = require('fs')
var path = require('path')

function Package (path) {
  this._path = path
}

Package.prototype._path = ''

Package.prototype.config = {}

Package.prototype.init = function () {
  var self = this
  fs.readFile(this._path, function (err, data) {
    if (err) throw err

    self.config = JSON.parse(data.toString())
  })
}

var link = new Package(path.join(__dirname, 'link', 'package.json'))
link.init()
var packages = {
  'link': link
}

module.exports = packages
