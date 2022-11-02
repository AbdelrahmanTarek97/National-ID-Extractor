// Standard middleware for parsing JSON requests
const bodyParser = require("body-parser");

// Standard library for enabling CORS
const cors = require("cors");

// Express framework to be used for server set-up
const express = require("express");

// Require our services
const nationalIdService = require("./services/nationalIdService");

// Initialize our express app
const app = express();

// Add middlewares required above
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// Add our endpoint
// First Middleware : isAValidNationalId
app.get(
  "/nationalId/analyze/:nationalId",
  nationalIdService.isValidNationalId,
  nationalIdService.returnExtractedData
);

// Start server with default port 3000 or a specified port by env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
