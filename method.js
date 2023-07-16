const db = require("./db");

// Assuming you have the db connection established

(async () => {
  try {
    await db.BeerBatchSample.aggregate([
      {
        $addFields: {
          parsedDate: {
            $dateFromString: {
              dateString: "$Date Created",
              format: "%Y-%m-%dT%H:%M:%S.%LZ" // Adjust the format according to your date string
            }
          }
        }
      },
      {
        $unset: "Date Created"
      },
      {
        $addFields: {
          "Date Created": "$parsedDate"
        }
      },
      {
        $out: "BeerBatchSample" // Specify the target collection name
      }
    ]);

    console.log("Aggregation completed successfully.");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error during aggregation:", error);
    process.exit(1); // Exit the script with an error code
  }
})();
