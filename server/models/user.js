const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: {
        type: String,
        maxlength: 100,
        trim: true,
    },
    phone: {
        type: String,
        default: 0,
        trim: true,
        default: "XXXX-XXXXXXX"
    },
    dob: {
        type: String,
        trim: true,
    },

    city: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    },
    token: {
        type: String
    },
    status: {
        type: String,
        trim: true,
        default: "active"
    },
    favorites: [
        {
            type: String,
            sparse: true
        }
    ],
    modifiedBy: {
        type: String,
        default: ""
    },
    showProfaneWords: {
        type: Boolean,
        default: false
    },
    emailNotification: {
        type: Boolean,
        default: false
    },
    // resetPasswordToken: String,
    // resetPasswordExpires: Date
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (error, salt) {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return next(error);

                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
        if (error) return callback(error);
        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function () {
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    jwt.verify(token, config.SECRET, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.deleteToken = function (token, cb) {
    var user = this;

    user.updateOne({ $unset: { token: 1 } }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };

