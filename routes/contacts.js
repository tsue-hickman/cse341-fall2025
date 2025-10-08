const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET routes
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);

// POST route - Create new contact
router.post('/', contactsController.createNewContact);

// PUT route - Update contact by ID
router.put('/:id', contactsController.modifyContact);

// DELETE route - Remove contact by ID
router.delete('/:id', contactsController.removeContact);

module.exports = router;