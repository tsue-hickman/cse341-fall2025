const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all temples from the database
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('temples').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single temple by id
const getSingle = async (req, res) => {
  try {
    // convert the id from the URL to an ObjectId for MongoDB
    const templeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('temples').findOne({ _id: templeId });
    
    if (!result) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a new temple
const createTemple = async (req, res) => {
  try {
    // validate that all required fields are present
    if (!req.body.name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    // create temple object from request body
    const temple = {
      temple_id: req.body.temple_id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location
    };
    
    // insert the temple into the database
    const result = await mongodb.getDatabase().collection('temples').insertOne(temple);
    
    if (result.acknowledged) {
      res.status(201).json({ message: 'Temple created successfully', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating temple' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update an existing temple
const updateTemple = async (req, res) => {
  try {
    // convert the id from the URL to an ObjectId
    const templeId = new ObjectId(req.params.id);
    
    // create update object from request body
    const temple = {
      temple_id: req.body.temple_id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location
    };
    
    // update the temple in the database
    const result = await mongodb.getDatabase().collection('temples').replaceOne({ _id: templeId }, temple);
    
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Temple not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete a temple
const deleteTemple = async (req, res) => {
  try {
    // convert the id from the URL to an ObjectId
    const templeId = new ObjectId(req.params.id);
    
    // delete the temple from the database
    const result = await mongodb.getDatabase().collection('temples').deleteOne({ _id: templeId });
    
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTemple,
  updateTemple,
  deleteTemple
};