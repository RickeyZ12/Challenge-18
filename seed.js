const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const db = require('./config/connection');

db.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const user1 = await User.create({ username: 'john_doe', email: 'john@example.com' });
    const user2 = await User.create({ username: 'jane_doe', email: 'jane@example.com' });

    // Create thoughts
    const thought1 = await Thought.create({ thoughtText: 'This is a thought!', username: 'john_doe' });
    const thought2 = await Thought.create({ thoughtText: 'Another thought!', username: 'jane_doe' });

    // Add reactions to thoughts
    await Thought.findByIdAndUpdate(thought1._id, { $push: { reactions: { reactionBody: 'This is a reaction!', username: 'jane_doe' } } });
    await Thought.findByIdAndUpdate(thought2._id, { $push: { reactions: { reactionBody: 'Great thought!', username: 'john_doe' } } });

    // Add friends
    await User.findByIdAndUpdate(user1._id, { $push: { friends: user2._id } });
    await User.findByIdAndUpdate(user2._id, { $push: { friends: user1._id } });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
