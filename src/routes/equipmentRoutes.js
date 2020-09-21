const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Equipment = mongoose.model("Equipment");

const router = express.Router();

router.use(requireAuth);

router.get("/equipments", async (req, res) => {
  const equipments = await Equipment.find();
  res.send(equipments);
});

router.post("/equipments", async (req, res) => {
  const {
    image,
    name,
    process,
    voltage,
    polarity,
    wire_diameter,
  } = req.body;

  if (
    !image ||
    !name ||
    !process ||
    !voltage ||
    !polarity ||
    !wire_diameter
  ) {
    return res
      .status(422)
      .send({
        error:
          "Hey, don't forget to provide image, name, process, voltage, polarity and wire diameter! ;)",
      });
  }

  try {
    const equipment = new Equipment({
      image,
      name,
      process,
      voltage,
      polarity,
      wire_diameter,
    });
    await equipment.save();
    res.send(equipment);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;