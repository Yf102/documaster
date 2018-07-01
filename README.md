# Documaster Example

This is an example application using Symfony, React and PostgreSQL.

## Requirements

* PHP 7.0+
* Apache web server [setup with virtual host to serve project folder](https://framework.zend.com/manual/2.2/en/user-guide/skeleton-application.html#using-the-apache-web-server)
* [Composer](http://getcomposer.org/) (manage php dependencies)
* [Npm installation](https://www.npmjs.com/get-npm) (manage node dependencies)
* Installed PostgreSQL
    * Running on localhost:5432
    * database: documaster
    * user: postgres
    * pass: Ecp123

## Setting up the web application

1. Get composer:

    ```
    curl -sS https://getcomposer.org/installer | php
    ```
    
2. Install the dependencies:

    ```
    php composer.phar install
    npm install
    npm run encore-both
    ```
3. Prepare DB
	```
	sh scripts/reset-db-sqlite.sh
	```
	
4. Update composer with new DB models
  	```
    php composer.phar update
	```

## Links
	https://www.npmjs.com/package/react-translate-component
	https://github.com/jedwatson/react-select
