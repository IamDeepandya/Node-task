const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required:true,
        unique: true, 
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err)
            return next(err);
        user.password =hash;
        next();
    });
});

UserSchema.method.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) 
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);