const mongoose = require("mongoose");

require("dotenv").config();

const Charge = require("../models/charger.js");


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chargehub", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Charge.deleteMany({});


    await Charge.insertMany([  // inserting frsh data
      {
        name: "Downtown Station A",
        location: { latitude: 40.7128, longitude: -74.0060 },
        status: "Active",
        powerOutput: 50,
        connectorType: "Type 2"
      },
      {
        name: "Uptown Fast Charge",
        location: { latitude: 40.7870, longitude: -73.9754 },
        status: "Inactive",
        powerOutput: 150,
        connectorType: "CCS"
      },
      {
        name: "Midtown Green Point",
        location: { latitude: 40.7549, longitude: -73.9840 },
        status: "Active",
        powerOutput: 100,
        connectorType: "CHAdeMO"
      },
      {
        name: "Eastside Charger Hub",
        location: { latitude: 40.7306, longitude: -73.9866 },
        status: "Active",
        powerOutput: 75,
        connectorType: "Type 2"
      },
      {
        name: "Westside Rapid",
        location: { latitude: 40.7750, longitude: -73.9870 },
        status: "Inactive",
        powerOutput: 120,
        connectorType: "CCS"
      }
    ]);

    console.log("db initialsed");
    process.exit(0);
  } 
  
  catch (err) {
    console.error("error in db ", err);
    process.exit(1);
  }
  
}

seed();
