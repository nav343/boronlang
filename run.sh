#!bin/bash
nearleyc  ./src/grammar/boron.ne -o ./src/dist/boron.js
node src/dist/parser.js $1
