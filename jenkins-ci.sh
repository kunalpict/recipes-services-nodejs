#!/bin/bash
#
# Script used to build the project in Jenkins
#
(
set -e

# Ensure we are in the workspace
cd "$WORKSPACE"

__DIR__="${BASH_SOURCE%/*}"

# shellcheck disable=SC1091
# shellcheck source=bin/setup-node.sh
source "$__DIR__/_setup-node.sh"

npm cache clean
npm install --loglevel warn
node_modules/.bin/gulp build
)
