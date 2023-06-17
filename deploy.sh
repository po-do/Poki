#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo npm install --frozen-lockfile

sudo npm run start
