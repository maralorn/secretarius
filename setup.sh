#!/bin/zsh
if [[ $1 == "clear" ]] {
dropdb $USER-secretarius
}
createdb $USER-secretarius
node lib/createsql.js | psql $USER-secretarius
