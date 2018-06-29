#!/bin/bash

if [ ! -d vendor ]; then
    echo "Please exec $0 from source root directory";
    exit;
fi

PROPEL_PARAMS="--platform=pgsql --sql-dir=src/orm/sql/pgsql/"

# Prepare config file, PHP models, sql db
vendor/bin/propel config:convert
vendor/bin/propel model:build
vendor/bin/propel sql:build

# Create insert init values and migrate all changes
vendor/bin/propel sql:insert
vendor/bin/propel sql:insert $PROPEL_PARAMS
vendor/bin/propel migrate
