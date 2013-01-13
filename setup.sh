#!/bin/zsh
npm install
npm update
if [[ $1 == "clear" ]] {
dropdb $USER-secretarius
}
createdb $USER-secretarius
psql $USER-secretarius -f model.sql
