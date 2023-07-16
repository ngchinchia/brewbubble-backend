const mongoose = require("mongoose"); //imports the mongoose library, easier way of validating mongodb databases

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //establish a connection to the MongoDB database.
    console.log("our db is connected");
  })
  .catch((err) => console.log(err.message));

  module.exports = mongoose.connection;
