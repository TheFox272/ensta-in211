#!/bin/bash

cd ./frontend
npm run build
cd ..

rm -rf ./backend/public
cp -R ./frontend/build ./backend/public

vercel deploy --prod
