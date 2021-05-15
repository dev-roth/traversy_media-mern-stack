# traversy_media-mern-stack

## Motivation

- Put "code along results" from the ["Learn the MERN Stack"](<https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE>) Tutorial under version control.
- Add technology & API explanations as code comments in order to understand them better.

## Step-By-Step Summary

1. We created the MonogDB DB (in this case a remote DB, could have been a local one as well).
2. We setup the BE (`npm init`) and provided real CRUD operations to the connected MongoDB (via mongoose). Tested via some REST client.
3. We setup the client (`npx create-react-app`) and started to implement some UI elements (via react and reactstrap).
4. We continued implementing the client by developing some logic and React components (using mocks as data).
5. We added state management (via redux and react-redux) - still using mocks without any persistence.
6. We connected the FE to the BE and therefore provided real persistence (via axios).
7. Prepare app for production/ deployment (adjust server.js, add postbuild script)

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
    - Connected GitHub repository  
    => in both cases a push to the particular repository will trigger the deployment
