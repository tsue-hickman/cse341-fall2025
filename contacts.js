const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find({}).toArray();
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// GET single contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    
    const db = getDB();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

// POST - Create new contact
const createNewContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Check if all required fields are present
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!favoriteColor) missingFields.push('favoriteColor');
    if (!birthday) missingFields.push('birthday');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }
    
    // Build the new contact object
    const newContactData = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    
    const db = getDB();
    const result = await db.collection('contacts').insertOne(newContactData);
    
    // Return 201 status with the new contact ID
    res.status(201).json({ 
      id: result.insertedId,
      message: 'Contact created successfully'
    });
    
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// PUT - Update existing contact
const modifyContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    // Validate the ID format first
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Build update object only with provided fields
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (favoriteColor) updateData.favoriteColor = favoriteColor;
    if (birthday) updateData.birthday = birthday;
    
    // Make sure there's something to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    const db = getDB();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updateData }
    );
    
    // Check if contact was found and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Return 204 No Content on successful update
    res.status(204).send();
    
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// DELETE - Remove contact
const removeContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    
    // Validate ID format
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    
    const db = getDB();
    const result = await db.collection('contacts').deleteOne({ 
      _id: new ObjectId(contactId) 
    });
    
    // Check if a contact was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Return 200 with success message
    res.status(200).json({ 
      message: 'Contact deleted successfully',
      deletedId: contactId
    });
    
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createNewContact,
  modifyContact,
  removeContact
};