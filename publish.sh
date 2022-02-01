#!/usr/bin/env bash

set -uo pipefail

DOCS_PREFIX="https://raw.githubusercontent.com/costas-basdekis/gcode-documentation/master/"

cd lib
npm run build
cp ../README.md ../LICENSE package.json dist
sed -i -E 's$(")(docs/)$\1'"$DOCS_PREFIX"'\2$g' dist/README.md
cd dist
npm publish
