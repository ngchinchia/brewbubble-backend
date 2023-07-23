/* sets up a router to handle POST requests to the "/create-user" endpoint and 
delegates the handling of that request to the createUser function from the "user" controller module. */
const express = require("express");

const router = express.Router();

const Beer = require("../beer");

const {
  createUser,
  createAdmin,
  createBeerBrewer,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
  getUserById,
  AddFriend,
} = require("../controllers/user");
const { userSignIn } = require("../controllers/user");
const { signOut } = require("../controllers/user");
const {
  validateUserSignIn,
  validateUserSignUp,
  userValidation,
} = require("../middleware/validation/user");

const { isAuth } = require("../middleware/validation/auth");

const {
  addToList,
  deleteFromList,
  deleteVenueFromList,
  deleteBreweryFromList,
  getWishlist,
  addVenueToList,
  addBreweryToList
} = require("../controllers/wishList");
const { postQuestion, getQuestions } = require("../controllers/postQuestion");
const { postAnswer } = require("../controllers/postQuestion");


const {
  createBeer,
  getAllBeers,
  getRandomBeers,
  getAllTaglines,
  getAllMaltNames,
  categorizeBeersByKeywords,
  getFirstBeers,
  getAllBeerStyles,
} = require("../controllers/trendingbeer");
const { handleAddBeer, retrieveAllBeers } = require("../controllers/beers");
const { getAllKeys } = require("../keywordmapping");

const { handleAddVenue } = require("../controllers/venue");
const { handleSearch } = require("../controllers/venue");
const { deleteVenue } = require("../controllers/venue");
const { updateVenue } = require("../controllers/venue");
const { AddPromotionToVenue } = require("../controllers/venue");
const { AddBeerToVenue } = require("../controllers/venue");
const { deletePromotionFromVenue } = require("../controllers/venue");
const { deleteBeersFromVenue } = require("../controllers/venue");

const { getAllVenues } = require("../controllers/venue");

const { deleteBeer } = require("../controllers/beers");
const { updateBeer } = require("../controllers/beers");
const { deletePromotion } = require("../controllers/promotion");
const { handleUpdatePromotion } = require("../controllers/promotion");
const { handleAddPromotion } = require("../controllers/promotion");




const {
  getDetailsByBeerName,
  getAllBeerBatches,
  addTrackerIDsToBeerBatch,
} = require("../controllers/beerbatch");
const {
  getFreshness,
  findByTrackerID,
  getAllKegs,
} = require("../controllers/smartkeg");
const { getAllBeerListData } = require("../controllers/beerlist");
const { fetchAllPlaces, fetchPlacesByName } = require("../controllers/place");

const { getAllBrewerys, handleAddBrewery } = require("../controllers/brewery");

const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByBeerId,
  getReviewsByUserId,
  addComment,
  viewComments,
  deleteComment,
  toggleLike,
  getReviewLikes
} = require("../controllers/createReview");

const {
  handleReport,
  banAccount, } = require("../controllers/reportAcc");

/*-----------------ROUTES FOR USER/ACCOUNT MANAGEMENT----------------------------------------------*/
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.post("/sign-out", isAuth, signOut);
router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/create-admin", validateUserSignUp, userValidation, createAdmin);
router.post(
  "/create-beerbrewer",
  validateUserSignUp,
  userValidation,
  createBeerBrewer
);
router.put("/update-user-name/:id", isAuth, updateUserName);
router.put("/update-user-email/:id", isAuth, updateUserEmail);
router.put("/update-user-password/:id", isAuth, updateUserPassword);
router.delete("/delete-user/:id", isAuth, deleteUser);
router.get("/user/:id", getUserById);
router.post("/user-add-friend/:id", AddFriend);

/*-----------------ROUTES FOR WISH LIST----------------------------------------------*/
router.post("/wishlist", isAuth, addToList);
router.post("/wishlist/addVenue", isAuth, addVenueToList);
router.post("/wishlist/addBrewery", isAuth, addBreweryToList);
router.delete("/wishlist/", isAuth, deleteFromList);
router.delete("/wishlist/venue", isAuth, deleteVenueFromList);
router.delete("/wishlist/brewery", isAuth, deleteBreweryFromList);
router.get("/wishlist/:userId", isAuth, getWishlist);
/*-----------------ROUTES FOR Q&A----------------------------------------------*/
router.post("/question", isAuth, postQuestion)
router.get("/question", isAuth, getQuestions)
router.put("/postAnswer/:id", postAnswer)


/*-----------------ROUTES FOR BEERS----------------------------------------------*/
router.delete("/beers/:id", deleteBeer);
router.put("/beers/:id", updateBeer);
router.get("/retrievebeers", retrieveAllBeers); //Get All Beers

router.post("/beers", handleAddBeer);
router.get("/beers", isAuth, async (req, res) => {
  try {
    const beers = await Beer.fetchAllBeers();
    res.json(beers);
  } catch (error) {
    console.log("Error fetching beers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/trendingbeers", createBeer);
router.post("/beerstyles", getAllKeys);
router.get("/allbeers", getAllBeers);
router.get("/firstbeers", getFirstBeers);
router.get("/randbeers", getRandomBeers);
router.get("/allbeerstyles", getAllBeerStyles);
router.get("/trendingbeers/maltnames", getAllMaltNames);
router.post("/categorizebeers", (req, res) => {
  categorizeBeersByKeywords(req, res);
});
/*-----------------ROUTES SMART KEG RELATED----------------------------------------------*/
router.get("/beerbatch", getDetailsByBeerName); //Func: Fetch beerbatch data by name and, etc : localhost:8000/beerbatch?name=Amber%20Ale
router.get("/smartkeg", getAllKegs);
router.get("/smartkeg/freshness", getFreshness); //Func: Fetch smart keg with freshness > 0%, etc : localhost:8000/smartkeg/freshness
router.get("/smartkeg/trackingid", findByTrackerID); //Func: Fetch smart keg by ID, etc : localhost:8000/smartkeg/trackingid?trackerID=BC57F6B0
router.get("/getallbeerbatch", getAllBeerBatches); //Func: Fetch all kegs full !=0 && from 2023 etc : localhost:8000/getallbeerbatch
router.post("/getallbeerbatch/addtracker", addTrackerIDsToBeerBatch); //Func: Add trackerIDs
router.get("/getallbeerlist", getAllBeerListData); //Func: Get all craft brewery beer types
router.get("/places", fetchAllPlaces);
router.get("/places/:name", fetchPlacesByName); //Func: Get specific place data by name, etc: localhost:8000/places/name=Example%20Place.

/*-----------------ROUTES FOR VENUE----------------------------------------------*/
router.post("/venue", handleAddVenue);
router.get("/getallvenues", getAllVenues);
router.delete("/venue/:id", deleteVenue);
router.put("/venue/:id", updateVenue);
router.get("/venue", handleSearch);
router.post("/venue/:id", AddPromotionToVenue);
router.post("/add-beer/:id", AddBeerToVenue);
router.delete("/venue/:id/promotion/:promotionId", deletePromotionFromVenue);
router.delete("/venue/:id/beer/:beerId", deleteBeersFromVenue);

router.post("/create-post", isAuth, (req, res) => {
  res.send("Welcome you are in secret route");
});
/*-----------------ROUTES FOR PROMOTIONS----------------------------------------------*/
router.post("/promotion", handleAddPromotion);
router.delete("/promotion/:id", deletePromotion);
router.put("/promotion/:id", handleUpdatePromotion);

/*-----------------ROUTES FOR BREWERY----------------------------------------------*/
router.get("/brewery", getAllBrewerys);
router.post("/addbrewery", handleAddBrewery);

/*-----------------ROUTES FOR CREATE REVIEW----------------------------------------------*/
// Create a new review
router.post('/reviews', createReview);

// Get all reviews
router.get('/reviews', getAllReviews);

// Get a specific review by ID
router.get('/reviews/:id', getReviewById);

// Update a review
router.put('/reviews/:id', updateReview);

// Delete a review
router.delete('/reviews/:id', deleteReview);

// Get reviews by beer ID
router.get('/reviews/beer/:beerId', getReviewsByBeerId);

// Get reviews by user ID
router.get('/reviews/user/:userId', getReviewsByUserId);

// Add comment to a review
router.post('/reviews/comments/:id', addComment);

// View comment to a review
router.get('/reviews/comments/:id', viewComments);

// Delete comment to a review
router.delete('/reviews/comments/:id/:commentId', deleteComment);

// Like Or Unlike a review
router.post('/reviews/likes/:id', toggleLike);

// Get all likes of a review
router.get('/reviews/likes/:id', getReviewLikes);
module.exports = router;
/*-----------------ROUTES FOR REPORT ACC ----------------------------------------------*/
router.post('/report-user', handleReport);  //user
router.post('/ban-account/:id', banAccount);  //admin

module.exports = router;
