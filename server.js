const cors = require("cors");
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
const port = 3000;

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Server Running On: http://localhost:${port}`);
});

/**
 * Fetch Weather Data
 */
app.get("/getWeatherData/", (request, response) => {
  return response.json(projectData).status(200);
});

const generateKey = () => {
  return "key_" + Object.keys(projectData).length;
};
/**
 * Post a new weather jounral item
 */
app.post("/watherEntry/", (request, response) => {
  const { temp, date, content } = request.body;
  let newEntryKey = generateKey();
  projectData[newEntryKey] = {
    date,
    temp,
    content,
  };

  return response.json(projectData).status(201);
});
