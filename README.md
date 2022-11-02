# National-ID-Extractor

You can run this project using the command
`npm start`

# Here's how the app is divided

- A `server.js` file and this is our app's main file.
- A `services` folder and this contains the services that have the functions that our `server.js` file calls whenever it gets a request.
- `services/nationalIdService` contains the main functions (functions are simple to read, contains minimal functionality).
- `services/utils` contain functions that carry out the actual work for the nationalIdService.
- A `services/json` folder that contains lookup json files.
- `services/json/errorCodeMessages` contains the error messages that get returned to the user.

# Here's how the app works

1. The user calls the following endpoint `http://localhost:3000/nationalId/analyze/{nationalIdNumber}` (the 3000 can change if there is an env variable that determines the process's port).
2. The request is parsed using standard json parsing middleware and routed using the Express framework.
3. The Express router divides the work by chaining 2 functions or (middlewares).
4. The first function validates and prepares the data that is included in a national ID. Then calls the second function.
5. The second function aggregates data and returns it to the user in a readable format.

# The app follows the following division of the national ID number Example below:

`2 - 990115 - 01 - 0192 - 1`

`x - yymmdd - ss - iiig - z`

- `x (2)` Is the birth century (2 represents 1900 to 1999, 3 represents 2000 to 2099 .. etc)
- `yymmdd (200115)` Is the date of birth, yy(99) year,mm(01) month, dd(15) day
- `ss(01)` Birth governorate code (88 for people who born in a foreign country, 01 for those who were born in Cairo, ...etc )
- `iiig(0192)` Basically your birth ID for that day
- `g(2)` Represents the gender (2,4,6,8 for females and 1,3,5,7,9)
- `z(1)` A number Ministry of Interior added it to validate if the National ID fake or not (1 to 9)

# P.S: I found it easier to write variable descriptions as variable names in responses
