#!/bin/sh
createdb $USER-secretarius
psql $USER-secretarius -f model.sql
