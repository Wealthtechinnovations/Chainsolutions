#!/bin/sh
set -e

echo "Initialisation de la base de données..."
node ./node_modules/prisma/build/index.js db push

echo "Démarrage de l'application..."
exec node server.js
