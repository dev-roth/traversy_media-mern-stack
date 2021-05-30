# traversy_media-mern-stack

- [traversy_media-mern-stack](#traversy_media-mern-stack)
  - [Motivation](#motivation)
  - [Step-By-Step Summary](#step-by-step-summary)
  - [Notes on developing the solution](#notes-on-developing-the-solution)
  - [Notes on setting up the DB](#notes-on-setting-up-the-db)
  - [Notes on deploying the solution](#notes-on-deploying-the-solution)
  - [Notes on JWT](#notes-on-jwt)

## Motivation

- Put "step-by-step results" from the ["Learn the MERN Stack"](<https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE>) Tutorial under version control.
- Add technology & API explanations as code comments in order to understand them better.
- Summarize and describe the single steps on a higher abstraction level here in the README.md file.

## Step-By-Step Summary

1. We created a MonogDB DB (in this case a remote DB hosted on [MongoDB Atlas](<https://cloud.mongodb.com>), but could have been a local one as well).
2. We setup the BE using `npm init` and provided real CRUD operations to the connected MongoDB via express.js using mongoose (testable with any REST client).
   1. server.js generally setup the BE (`const app = express(); app.listen()`).
   2. server.js connects to the DB and uses imported routes (`mongoose.connect(); app.use(...)`).
   3. route files define routes using `express.Router();` and `router.get(), post(),...` (`express().get(), .post(),...` would work too).
   4. route files use corresponding model files for implementing the actual CRUD operations (e.g. `SomeModel.find(), .save(),...`).
   5. model files use `mongoose.Schema` to define the schema/ structure of the single MongoDB collection items.
3. We setup the client using `npx create-react-app` and started to implement some UI elements with react and reactstrap.
4. We continued implementing the client by adding React components (using mocks as data, no connection to the BE yet).
5. We added state management via redux and react-redux (`store.js, /actions/XYActions.js, /reducers/XYReducer.js, /components/XYComponent => connect()`) - still using mocks without any persistence so far.
6. We connected the FE to the BE and therefore provided real persistence with client-server requests via axios (calls been made within the reducers).
7. We prepared the app for production deployment.
   1. Adjust server.js to serve static assets in production instead of using the development server (`app.use(express.static("client/build"))`)
   2. Add a custom build script to the package.json based on the particular deployment needs (using `npm install` and `npm build` among other commands).
8. We actually triggered a deployment on Heroku (using git push as the actual trigger), after having created an app in Heroku (web UI or via CLI).
9. Optional/ self taught - We replaced the DB URL (incl. Credentials) in plain text with an env variable (both on Heroku via config variable and locally via .env file).
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

## Notes on setting up the DB

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

## Notes on JWT

- Homepage: <https://jwt.io/>
- JWT := JSON Web Tokens - which are an open, industry standard RFC 7519 method for representing claims securely between two parties using JSON objects.
- The transmitted information can be verified and trusted, because it is digitally signed. JWTs can be signed using a secret or a public/private key.
- In its compact form, JSON Web Tokens consist of three parts separated by dots (.). Example:
  - Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
  - Header:

    ```json
    {
    "alg": "HS256",
    "typ": "JWT"
    }
    ```

  - Payload:
  
    ```json
    {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
    }
    ```
  
  - Signature:

    ```code
    HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      <secret>
    ) 
    ```
