#!bin/bash
nearleyc  ./src/grammar/boron.ne -o ./src/dist/boron.js
node src/dist/parser.js $1

echo
echo OUTPUT:
python3 example/main.py
