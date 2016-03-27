#!/bin/bash
set -e

NODE_VERSION=5.1.1
#NPM_VERSION=3.3.12
FILENAME=node-v$NODE_VERSION-linux-x64
NODE_HOME=$WORKSPACE/$FILENAME
NPMRC=/private/sni/.npmrc

npm() {
  /usr/bin/env npm --userconfig "$NPMRC" "$@"
}

# Make sure we are in the workspace
cd "$WORKSPACE"

if [ ! -e $FILENAME.tar.gz ]
then
  wget https://nodejs.org/dist/v$NODE_VERSION/$FILENAME.tar.gz
  tar xf $FILENAME.tar.gz
fi

export PATH=$NODE_HOME/bin:$PATH

# Upgrade npm to known good version
#npm install -g npm@$NPM_VERSION

npm version
cat $NPMRC
