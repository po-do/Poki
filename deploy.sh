#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install --frozen-lockfile

sudo npx pm2 reload all
