const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  image: String,
  name: String,
  process: String,
  voltage: String,
  polarity: String,
  wire_diameter: String,
});

mongoose.model("Equipment", equipmentSchema);
