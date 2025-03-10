const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const { join } = require("path");
const authConfig = require("./auth_config.json");

const app = express();

// Serve assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Create the JWT validation middleware
const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}`
});


// Middleware to parse JSON bodies
app.use(express.json());

// Protected API endpoint
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

// Form submission endpoints
app.post("/submit-form1", checkJwt, (req, res) => {
  res.send({ msg: "Form 1 submitted successfully!", data: req.body });
});

app.post("/submit-form2", checkJwt, (req, res) => {
  res.send({ msg: "Form 2 submitted successfully!", data: req.body });
});

app.post("/submit-form3", checkJwt, (req, res) => {
  res.send({ msg: "Form 3 submitted successfully!", data: req.body });
});

// Serve the auth configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page to everything else
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Error handler
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

// Listen on port 3000
app.listen(3000, () => console.log("Application running on port 3000"));

module.exports = app;