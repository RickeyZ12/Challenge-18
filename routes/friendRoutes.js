const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a friend to a user
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a friend from a user
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
