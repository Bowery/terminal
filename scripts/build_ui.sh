#!/usr/bin/env bash

# Get the full path to the parent of this script.
source="${BASH_SOURCE[0]}"
while [[ -h "${source}" ]]; do source="$(readlink "${source}")"; done
root="$(cd -P "$(dirname "${source}")/.." && pwd)"
cd "${root}"

mkdir -p build/

if [[ ! -f "$(which vulcanize)" ]]; then
  npm install -g vulcanize
fi

if [[ ! -d build/libdot ]]; then
  git clone https://github.com/macton/libdot.git build/libdot
  cd build/libdot
  npm install
  grunt
  mv dist/* .
  cd -
fi

if [[ ! -d build/hterm ]]; then
  git clone https://github.com/bowery/hterm.git build/hterm
  cd build/hterm
  mv src/* .
  cd -
fi

vulcanize --verbose --inline app/term.html -o app/term.min.html &> debug.log
