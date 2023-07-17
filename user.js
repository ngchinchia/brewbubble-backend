/* Database for user login */
/* defines a user schema, including validation requirements, 
and exports it as a Mongoose model. It also provides a static method to check if an email is already in use by an existing user. */

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "beer_brewer"],
    default: "user",
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  tokens: [{ type: Object }],

});

// Function to hash password before saving user into database
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    })
  }
})

// Function to compare password
userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('can not compare');

  try {
    const result = await bcrypt.compare(password, this.password)
    return result;
  } catch (error) {
    console.log('Error while comparing password', error.message)
  }
}
// Function to check email whether email exist
userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("invalid email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error is in email inuse method", error.message);
    return false;
  }
};

//Function to fetch all users from the users database
userSchema.statics.fetchAllUsers = async function () {
  try {
    // Fetch data from MongoDB using your data retrieval logic
    const data = await this.find(); // Use `this.find()` to fetch all users from the User collection

    // Return the fetched data
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw new Error("Internal server error");
  }
};



module.exports = mongoose.model("User", userSchema);
