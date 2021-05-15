# traversy_media-mern-stack

## Motivation

- Put "code along results" from the ["Learn the MERN Stack"](<https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE>) Tutorial under version control.
- Add technology & API explanations as code comments in order to understand them better.

## Guide developing the solution

- Init BE: `npm init`
- Init FE: `npx create-reate-app`

- Most important dependencies:
  - General:
    - `concurrently` - tool to run multiple commands concurrently
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
      => create a DB cluster, create a DB user, connect to the DB (get the created connection string)
      => well-known Cloud Provider like AWS, Azure or Google Cloud take care of the actual hosting
