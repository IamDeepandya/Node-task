router.get('/location', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { latitude, longitude } = req.query;
  
    Post.find({
      'geoLocation.latitude': latitude,
      'geoLocation.longitude': longitude
    }, (err, posts) => {
      if (err) return res.status(500).json({ message: 'Error retrieving posts' });
      res.status(200).json(posts);
    });
  });
  