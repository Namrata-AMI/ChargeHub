const Charge = require("../models/charger.js");

// Create charge
exports.createCharge = async (req, res) => {
  try {
    const charge = new Charge(req.body);
    await charge.save();
    res.status(201).json(charge);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get all charges
exports.getAllCharges = async (req, res) => {
  try {
    const charges = await Charge.find();
    res.status(200).json(charges);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get one charge by ID
exports.getChargeById = async (req, res) => {
  try {
    const charge = await Charge.findById(req.params.id);
    if (!charge) {
      return res.status(400).json({ message: "Charger not found" });
    } else {
      res.status(200).json(charge);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update charge
exports.updateCharge = async (req, res) => {
  try {
    const charge = await Charge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!charge) {
      return res.status(400).json({ message: "Charger not found" });
    } else {
      res.status(200).json(charge);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete charge
exports.deleteCharge = async (req, res) => {
  try {
    const charge = await Charge.findByIdAndDelete(req.params.id);
    if (!charge) {
      return res.status(404).json({ message: "Charger not found" });
    } else {
      res.status(200).json({ message: "Charger deleted" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
