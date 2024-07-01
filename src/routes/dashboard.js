const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');


router.get('/count', passport.authenticate('jwt', {session:false}), (req, res) => {
    Post/aggregate([
        {$match: {createdBy: req.user.id}},
        {
            $group: {
                _id: null,
                activeCount: {$sum: {$cond: ['$active', 1,0]}},
                inactiveCount: {$sum: {$cond: ['$active', 0,1]}}
            }
        }
    ], (err, result) => {
        if (err) 
            return res.status(500).json({ message: 'Error counting posts'});
        res.status(200).json(result[0]);
    });
});

module.exports = router;