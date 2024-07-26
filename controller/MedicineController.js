const Medicine = require('../models/Medicine');
const redisClient = require('../config/redis');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Middleware for caching
const cache = (req, res, next) => {
  const { name } = req.query;
  redisClient.get(name, (err, data) => {
    if (err) throw err;
    if (data) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

// Create a new medicine record
const createMedicine = async (req, res) => {
  try {
    const { name, price, discountPrice, quantity, manufacturer } = req.body;
    const newMedicine = new Medicine({ name, price, discountPrice, quantity, manufacturer });

    if (req.file) {
      newMedicine.imageUrl = req.file.path;
    }

    const medicine = await newMedicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read medicine records
const getMedicines = async (req, res) => {
    try {
      const { name, price, quantity, manufacturer, sort } = req.query;
      const filters = { name: new RegExp(name, 'i'), price, quantity, manufacturer };
      for (let key in filters) if (!filters[key]) delete filters[key];
  
      const sortOrder = sort ? { [sort]: 1 } : {};
      const medicines = await Medicine.find(filters).sort(sortOrder);
      redisClient.setex(req.query.name, 600, JSON.stringify(medicines));
      res.status(200).json(medicines);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Update a medicine record
const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    if (req.file) {
      updatedData.imageUrl = req.file.path;
    }

    const medicine = await Medicine.findByIdAndUpdate(id, updatedData, { new: true });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a medicine record
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.status(200).json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createMedicine, getMedicines, updateMedicine, deleteMedicine, cache, upload };
