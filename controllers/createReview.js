const Review = require("../createReview");
const Beer = require("../beer");
const Venue = require("../venue");
const User = require("../user");
const multer = require("multer");
const path = require("path");

// const upload = multer().none();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to store the uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage }).single("image");

const createReview = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        // Handle multer error
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      const userId = req.body.userId;
      const beerId = req.body.beerId;
      const reviewText = req.body.reviewText;
      const rating = req.body.rating;
      const servingStyle = req.body.servingStyle;
      const flavorProfile = req.body.flavorProfile;
      const purchasedVenueId = req.body.purchasedVenueId;
      const image = req.file; // Access the uploaded file using req.file
      console.log(req.file);

      console.log(userId);

      // Check if the beer exists
      const beer = await Beer.findById(beerId);
      if (!beer) {
        return res.status(404).json({ error: "Beer not found" });
      }

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the purchased venue exists
      const purchasedVenue = await Venue.findById(purchasedVenueId);
      if (!purchasedVenue) {
        return res.status(404).json({ error: "Purchased venue not found" });
      }

      // Create the review
      const review = new Review({
        user: userId,
        beer: beerId,
        reviewText,
        rating,
        servingStyle,
        flavorProfile,
        purchasedVenue: purchasedVenueId,
        image: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`, // Save the filename in the review document
      });

      // Save the review
      await review.save();

      // Calculate the average rating for the associated beer after saving the review
      const beerToUpdate = await Beer.findById(beerId);
      await beerToUpdate.calculateAverageRating();

      // Send the response only once, after all the operations are completed
      res.status(201).json(review);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).exec();

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviewsByBeerId = async (req, res) => {
  try {
    const { beerId } = req.params;
    const reviews = await Review.find({ beer: beerId })
      .populate("user", "first last")
      .populate("purchasedVenue", "venueName venueAddr")
      .exec();

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for the specified beer" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        // Handle multer error
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }

      const reviewId = req.params.id; // Assuming the review ID is passed as a URL parameter
      const userId = req.body.userId;
      const beerId = req.body.beerId;
      const reviewText = req.body.reviewText;
      const rating = req.body.rating;
      const servingStyle = req.body.servingStyle;
      const flavorProfile = req.body.flavorProfile;
      const purchasedVenueId = req.body.purchasedVenueId;

      // Check if the review exists
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      // Check if the beer exists
      const beer = await Beer.findById(beerId);
      if (!beer) {
        return res.status(404).json({ error: "Beer not found" });
      }

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the purchased venue exists
      const purchasedVenue = await Venue.findById(purchasedVenueId);
      if (!purchasedVenue) {
        return res.status(404).json({ error: "Purchased venue not found" });
      }

      // Update the review properties
      review.user = userId;
      review.beer = beerId;
      review.reviewText = reviewText;
      review.rating = rating;
      review.servingStyle = servingStyle;
      review.flavorProfile = flavorProfile;
      review.purchasedVenue = purchasedVenueId;

      // Update the image if a new image is uploaded
      if (req.file) {
        const image = req.file;
        review.image = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;
      }

      // Save the updated review
      await review.save();

      // Send the response only once, after all the operations are completed
      res.status(200).json(review);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id).exec();

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user's reviews
    const userReviews = await Review.find({ user: userId })
      .populate("user", "first last")
      .populate("purchasedVenue", "venueName venueAddr")
      .populate("beer")
      .exec();

    // Fetch the user's friends
    const user = await User.findById(userId).populate("friends", "reviews");

    // Fetch the reviews of each friend
    const friendsReviews = await Review.find({ user: { $in: user.friends } })
      .populate("user", "first last")
      .populate("purchasedVenue", "venueName venueAddr")
      .populate("beer")
      .exec();

    // Combine the user's reviews and friends' reviews into a single array
    const allReviews = [...userReviews, ...friendsReviews];

    if (allReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({ reviews: allReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const addComment = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.body.userId;
    const commentText = req.body.commentText;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new comment object
    const comment = {
      user: userId,
      review: reviewId, // Set the review field to the ID of the review
      commentText,
    };

    // Add the comment to the review's comments array
    review.comments.push(comment);

    // Save the updated review
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const viewComments = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    const comments = await Promise.all(
      review.comments.map(async (comment) => {
        const user = await User.findById(comment.user);
        const { first, last } = user;
        return {
          commentId: comment._id,
          first,
          last,
          commentText: comment.commentText,
        };
      })
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const deleteComment = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.body.userId;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Find the index of the comment in the review's comments array
    const commentIndex = review.comments.findIndex((comment) =>
      comment._id.equals(commentId)
    );

    if (commentIndex === -1) {
      // Comment not found in the review
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user ID in the comment matches the provided user ID
    if (!review.comments[commentIndex].user.equals(userId)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Remove the comment from the comments array
    review.comments.splice(commentIndex, 1);

    // Save the updated review
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const toggleLike = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.body.userId;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!review.likes.includes(userId)) {
      // User has not liked the review, add a new like
      review.likes.push(userId);
    } else {
      //settle
      review.likes.splice(
        review.likes?.findIndex((user) => user.equals(userId)),

      );
    }

    // Save the updated review
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getReviewLikes = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the review by ID
    const review = await Review.findById(id).exec();

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Extract the likes from the review
    const likes = review.likes;

    res.status(200).json({ likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Testing retrieval for activity page
const retrieveAllData = async (req, res) => {
  try {
    // Extract the necessary data from the request
    const { userId, beerId, purchasedVenueId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the beer exists
    const beer = await Beer.findById(beerId);
    if (!beer) {
      return res.status(404).json({ error: "Beer not found" });
    }

    // Check if the purchased venue exists
    const purchasedVenue = await Venue.findById(purchasedVenueId);
    if (!purchasedVenue) {
      return res.status(404).json({ error: "Purchased venue not found" });
    }

    // Create the review
    const review = new Review({
      user: userId,
      beer: beerId,
      purchasedVenue: purchasedVenueId,
      // Other review properties...
    });

    // Save the review
    await review.save();

    // Populate the user, beer, and purchasedVenue fields in the review
    await review
      .populate("user", "first last")
      .populate("beer", "name")
      .populate("purchasedVenue", "name")
      .execPopulate();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
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
  getReviewLikes,
  retrieveAllData,
};
