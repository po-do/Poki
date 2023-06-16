#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install --frozen-lockfile

npm run start

sudo npx pm2 reload all