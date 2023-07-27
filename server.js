/* To startup server, cd into backend & key in node server.js to run. */
const express = require("express"); //imports the express framework, allow creation of a web server and handle HTTP requests & responses.
require("dotenv").config(); //loads the contents of the .env file into the environment variables, making them accessible in your application.
require("./db");
require("./wishList")
const axios = require("axios");
const mongoose = require("mongoose");
const multer = require('multer');


const app = express(); //creates an instance of the Express application

const userRouter = require('./backend_routes/user');
const User = require("./user");
const Beer = require("./beer");
const beerController = require("./trendingbeer");
const user = require("./user");
const Venue = require("./venue");
const venue = require("./venue");
const Promotion = require("./promotion");
const Brewery = require("./brewery");
const AllBeer = require("./trendingbeer");

const { getAllKeys } = require('./keywordmapping');

//created, check
const wishList = require("./wishList");
const ReportAcc = require("./reportAcc");

// API endpoint to fetch data for all reported acc
app.get("/reportAcc", async (req, res) => {
  try {
    const reportedAccounts = await ReportAcc.fetchAllReported();

    res.json(reportedAccounts);
  } catch (error) {
    console.log("Error fetching accounts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch data for all beers
app.get("/promotion", async (req, res) => {
  try {
    // Call the fetchAllUsers function to get all users
    const Promotions = await Promotion.fetchAllPromotion();

    // Send the fetched users as a response
    res.json(Promotions);
  } catch (error) {
    console.log("Error fetching promotion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const wishListItems = await wishList.fetchAllWishListItems();
    res.json(wishListItems);

  } catch (error) {
    console.log("Error fetching wish list items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//API endpoint to fetch data from MongoDB
app.get("/users", async (req, res) => {
  try {
    // Call the fetchAllUsers function to get all users
    const users = await User.fetchAllUsers();

    // Send the fetched users as a response
    res.json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// route to handle the GET request for retrieving user data
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId); // Retrieve user data from the database

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// API endpoint to fetch data for all beers
app.get("/beers", async (req, res) => {
  try {
    // Call the fetchAllUsers function to get all users
    const beers = await Beer.fetchAllBeers();

    // Send the fetched users as a response
    res.json(beers);
  } catch (error) {
    console.log("Error fetching beers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch data for all beers
app.get("/allbeers", async (req, res) => {
  try {
    // Call the fetchAllUsers function to get all users
    const allbeers = await AllBeer.fetchAllTrendingBeer();

    // Send the fetched users as a response
    res.json(allbeers);
  } catch (error) {
    console.log("Error fetching allbeers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/venue", async (req, res) => {
  try {
    const venue = await Venue.fetchAllVenues();

    res.json(venue);
  } catch (error) {
    console.log("Error fetching venues:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/brewery", async (req, res) => {
  try {
    const brewery = await Brewery.getAllBrewerys();

    res.json(venue);
  } catch (error) {
    console.log("Error fetching brewery:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/keys', (req, res) => {
  const keys = getAllKeys();
  res.json(keys);
});






app.use(express.json());
app.use(userRouter);
// app.use(contactUsRouter);





const BeerBatch = require("./beerbatch");


const upload = multer();
app.use(upload.none());


const path = require('path');

// ...

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







app.get("/", (req, res) => {
  res.send("<h1>Server Is Running!</h1>");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("port is listening"); //starts express server & listen to any localhost port number, for etc: localhost:8000
});



