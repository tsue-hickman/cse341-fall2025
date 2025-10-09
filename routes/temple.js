const express = require('express');
const router = express.Router();
const templesController = require('../controllers/temples');

// get all temples
router.get('/', templesController.getAll);

// get a single temple by id
router.get('/:id', templesController.getSingle);

// create a new temple
router.post('/', templesController.createTemple);

// update an existing temple
router.put('/:id', templesController.updateTemple);

// delete a temple
router.delete('/:id', templesController.deleteTemple);

module.exports = router;