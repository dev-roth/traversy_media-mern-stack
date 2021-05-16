# traversy_media-mern-stack

## Motivation

- Put "code along results" from the ["Learn the MERN Stack"](<https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE>) Tutorial under version control.
- Add technology & API explanations as code comments in order to understand them better.

## Step-By-Step Summary

1. We created the MonogDB DB (in this case a remote DB, could have been a local one as well).
2. We setup the BE (`npm init`) and provided real CRUD operations to the connected MongoDB (via mongoose). Tested via some REST client.
3. We setup the client (`npx create-react-app`) and started to implement some UI elements (via react and reactstrap).
4. We continued implementing the client by adding React components (using mocks as data).
5. We added state management (via redux and react-redux) - still using mocks without any persistence so far.
6. We connected the FE to the BE and therefore provided real persistence (client (web) requests via axios).
7. We prepared the app for production/ deployment
   1. Adjust server.js to serve static assets in production (instead of using the development server)
   2. Add a custom build script to the package.json based on the particular deployment needs (using `npm install` and `npm build` commands)
8. We actually triggered a deployment on Heroku, after having created an app in Heroku.
9. (Optional/ self taught) We replaced DB URL (incl. Credentials) in plain text with env variable (both on Heroku via config variable and locally via .env file)
10. TODO: We added authentication via JWT

## Notes on developing the solution

- Init BE: `npm init`
- Init FE: `npx create-reate-app`

- Most important dependencies:
  - General:
    - `concurrently` - tool to run multiple commands concurrently  
    => e.g. used as custom `script`: `"dev": "concurrently \"npm run server\" \"npm run client\""`
    - `nodemon` - automatically restarting the node application when files change
  - BE:
    - `express` - minimalist web framework for Node.js
    - `mongoose` - MongoDB object modeling/ ORM for Node.js
  - FE:
    - `react` - JavaScript library for building user interfaces
    - `reactstrap` - React Bootstrap components
    - `redux` - State Container for JS Apps
    - `react-redux` - React UI bindings layer for Redux

- MongoDB:
  - Setup locally
    - using binaries directly:
      - <https://docs.mongodb.com/guides/server/install/>
      - <https://www.mongodb.com/try/download/community>
    - using Docker:
      - <https://www.code4it.dev/blog/run-mongodb-on-docker>
      - <https://hub.docker.com/_/mongo>
  - Setup remotely
    - using hosted DB:
      - basically all known cloud provider provide MongoDB as a DB option
      - offical "DB as a Service" from MongoDB itself: [MongoDB Atlas](<https://cloud.mongodb.com>)
      => create a free account, create a DB cluster (one free MO Sandbox Cluster available), create a DB user, configure DB access, connect to the DB (get the created connection string)
      => well-known Cloud Provider like AWS, Azure or Google Cloud take care of the actual hosting
    - using on-premise (self-hosted) DB:
      - TODO

## Notes on deploying the solution

- Chose a cloud provider (e.g. with a free account/ tier).
- Using Heroku:
  - <https://www.heroku.com/>
  - create a free account, create a new app via Web UI or via Heroku CLI (<https://devcenter.heroku.com/articles/heroku-cli>)
  - chose deployment method:
    - Heroku Git via Heroku CLI
    - connected GitHub repository  
    => in both cases a push to the particular repository will trigger the deployment
  - improving security by extracting the DB credentials (plain text within the code) into Heroku config variables (<https://devcenter.heroku.com/articles/config-vars>)  
  => Config vars are exposed to your app’s code as environment variables. For example, in Node.js you can access your app’s DATABASE_URL config var with `process.env.DATABASE_URL`.
