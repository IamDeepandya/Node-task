const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    createdBy: req.user.id,
    geoLocation: {
      latitude: req.body.geoLocation.latitude,
      longitude: req.body.geoLocation.longitude
    }
  });

  newPost.save((err, post) => {
    if (err) return res.status(500).json({ message: 'Error creating post' });
    res.status(200).json(post);
  });
});


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.find({ createdBy: req.user.id }, (err, posts) => {
    if (err) return res.status(500).json({ message: 'Error retrieving posts' });
    res.status(200).json(posts);
  });
});


router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true },
    (err, post) => {
      if (err) return res.status(500).json({ message: 'Error updating post' });
      res.status(200).json(post);
    }
  );
});


router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id, createdBy: req.user.id }, (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting post' });
    res.status(200).json({ message: 'Post deleted' });
  });
});

module.exports = router;
