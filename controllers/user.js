/* this code handles the CREATION of a new user by checking if 
the provided email is already in use, creating a new user object, saving it to the database, and returning the created user as a response. */
const jwt = require('jsonwebtoken');
const User = require("../user");
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { first, last, email, password } = req.body;

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use",
    });
  const user = await User({
    first,
    last,
    email,
    password,
  });

  user.userType = "user";
  await user.save();
  res.json(user);
};

exports.createAdmin = async (req, res) => {
  const { first, last, email, password, userType } = req.body;

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use",
    });
  const user = await User({
    first,
    last,
    email,
    password,
    userType
  });

  await user.save();
  res.json(user);
};

exports.createBeerBrewer = async (req, res) => {
  const { first, last, email, password, userType } = req.body;

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use",
    });
  const user = await User({
    first,
    last,
    email,
    password,
    userType
  });

  await user.save();
  res.json(user);
};

exports.updateUserName = async (req, res) => {
  const userId = req.params.id;
  const { first, last } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { first, last },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};



exports.updateUserEmail = async (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

exports.updateUserPassword = async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = password; // Assign the new password to the user's password field

    // Save the user document (the `pre` hook will automatically hash the password before saving)
    await user.save();

    res.json({
      success: true,
      message: "User password updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user password",
      error: error.message,
    });
  }
};




exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, message: "user not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({ success: false, message: "password do not match" });


  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  let oldTokens = user.tokens || [] //if there are tokens, assign them if not assign to empty

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((token) => {
      const timeDiff = (Date.now() - parseInt(token.signedAt) / 1000) // time diff between date signed in and curr date
      if (timeDiff < 86400) {
        return token;
      }

    });
  }

  await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token, signedAt: Date.now().toString() }] })


  // user.tokens.forEach((token, index) => {
  //   console.log(`Token ${index + 1}:`);
  //   console.log(`Token: ${token.token}`);
  //   console.log(`SignedAt: ${token.signedAt}`);
  // });
  console.log('success')
  res.json({ success: true, user, token });
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens || [];

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message,
    });
  }
};

exports.AddFriend = async (req, res) => {
  const userID = req.params.id;
  const { friendId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { $addToSet: { friends: { $each: [friendId] } } },
      { safe: true, upsert: true },
    );

    const friend = await User.findOneAndUpdate(
      { _id: friendId },
      { $addToSet: { friends: { $each: [userID] } } },
      { safe: true, upsert: true },
    );

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User or friend not found",
      });
    }

    res.json({
      success: true,
      message: "Friend added successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add friend",
      error: error.message,
    });
  }
};




module.exports = exports;