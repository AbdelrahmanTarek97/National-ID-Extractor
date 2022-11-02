# National-ID-Extractor

You can run this project using the command
`npm start`

# Here's how the app is divided

- A `server.js` file and this is our app's main file.
- A `services` folder and this contains the services that have the functions that our `server.js` file calls whenever it gets a request.
  -- `services/nationalIdService` contains the main functions (functions are simple to read, contains minimal functionality).
  -- `services/utils` contain functions that carry out the actual work for the nationalIdService.
- A `services/json` folder that contains lookup json files.
  -- `services/json/errorCodeMessages` contains the error messages that get returned to the user.

# Here's how the app works

1. The user calls the following endpoint `http://localhost:3000/nationalId/analyze/{nationalIdNumber}` (the 3000 can change if there is an env variable that determines the process's port).
2. The request is parsed using standard json parsing middleware and routed using the Express framework.
3. The Express router divides the work by chaining 2 functions or (middlewares).
4. The first function validates and prepares the data that is included in a national ID. Then calls the second function.
5. The second function aggregates data and returns it to the user in a readable format.

# P.S: I found it easier to write variable descriptions as variable names in responses
