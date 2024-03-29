const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
});
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next){
    const user = this;
    const salt = bcrypt.genSalt(10);
    bcrypt.hash(user.password, salt, (error, hash)=>{
        user.password = hash;
        next();
    })
})
// export model
const User = mongoose.model('User',UserSchema);
module.exports = User;