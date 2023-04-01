# IP3

## Database set up and system initialisation

Step 1.

Download MySQL. Set default password to admin

Step 2.

load up MySQL command line client and run:

create database ip3b11;
use ip3b11;

then paste in the contents of db.sql (in root directory of project)

Step 3.

Run the program and navigate to localhost:8080/database/load
You should receive a message stating the database has been loaded

Step 4.

Navigate to localhost:8080/database/loadfixtures
You should see a message once the fixtures are loaded in

Step 5. 

Use it, and please don't run into any errors :( :(

## To Rebuild Database

Step 1.

Go to MySQL Command Line Client and run drop database ip3b11;

Step 2.

Follow steps described above to initialise and rebuild new db.
