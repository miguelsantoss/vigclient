

**VIGCLIENT**
---------
 - INTRODUCTION
 - CLIENT
 - SERVER
 
 This web-app as a separated client and server folders for better organization and reading, the client folder stores the client side app and the server folder stores the server side of the app both are independent, you still need the server to be running to have database connection and validations etc...
## **CLIENT STRUCTURE** ##

> .
+--- public/
+--- src/
|   +---- actions/
|   +---- components/
|   +---- json/
|   +---- pages/
|   +---- reducers/
|   +---- utils/
|   +---- history.js
|   +---- index.js
|   +---- jsonData.js
|   +---- routes.js
+--- package.json
## **SERVER STRUCTURE** ##
> .
+--- src/
|   +---- middlewares/
|   +---- migrations/
|   +---- models/
|   +---- routes/
|   +---- reducers/
|   +---- shared/
|   +---- bookshelf.js
|   +---- config.js
|   +---- index.js
|   +---- knexfile.js
+--- package.json

----------

> **KnexFile.js ->** Its the database configuration file, you can choose the client, which in this project is mysql, example:
**Index.js ->** Its the Server (self explanatory)
**config.js ->** Json web token secret phrase
**bookshelf->** Config file to choose, if have multiple ENV in knexfile
**migrations/user.js ->** knex to create a table in case doesnt exist ( its called in the program itself)
**model/users.js ->** its the model table for the users, its called in the program to get information