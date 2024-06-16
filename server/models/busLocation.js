// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const busLocationSchema = new mongoose.Schema({
  busId: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

// Create a Mongoose model
const BusLocation = mongoose.model('BusLocation', busLocationSchema);

// Export the model
module.exports = BusLocation;
