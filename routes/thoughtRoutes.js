const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a thought
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a thought
router.delete('/:id', async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
