import express from 'express';
import { getProperties, getProperty, createProperty, updateProperty, deleteProperty } from '../controllers/property.controller.js';
const router = express.Router();

// Get all properties
router.get('/properties', getProperties);

// Get a single property by ID
router.get('/properties/:id', getProperty);

// Create a new property
router.post('/properties', createProperty);

// Update a property
router.put('/properties/:id', updateProperty);

// Delete a property
router.delete('/properties/:id', deleteProperty);

export default router;
