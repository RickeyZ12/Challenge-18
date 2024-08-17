const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.id(req.params.reactionId).remove();
    await thought.save();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
