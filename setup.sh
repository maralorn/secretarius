#!/bin/zsh
if [[ $1 == "clear" ]] {
dropdb $USER-secretarius
}
createdb $USER-secretarius
node lib/server/createsql.js | psql $USER-secretarius
