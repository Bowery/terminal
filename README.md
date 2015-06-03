# terminal

an atom-like terminal. easily extensible and customizable.

## Setup

terminal is built on top of Atom's [electron](https://github.com/atom/electron) framework. To install:

```
$ make deps
```

To run the terminal:

```
$ make
```

## Plugins

For now, all plugins are located in `app/plugins`. This is temporary and solely for the purposes of defining and testing the plugin api.

### package.json

Every package has a corresponding json file describing it and it's behavior. For example:

```
{
  "name": "link",
  "main": "./lib/link.js",
  "description": "Turn urls into clickable links.",
  "license": "MIT",
  "actions": {
    "stdout": [],
    "stderr": [],
    "stdin": [],
    "display": []
  }
  "dependencies": {}
}
```
