//this is a Mongoose model, which defines how user data is structured and saved in your MongoDB database. 

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,unique: true },
    password: {type: String,required: true }
});

//This schema is what tells MongoDB: "Every user document should look like this."


UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

/*

In Mongoose, pre('save') is a middleware hook — which means it runs automatically before the document is saved to the database.





This is a middleware hook that runs before saving a user to the database:

It checks if the password field is modified. If not, it skips hashing.

If yes, it generates a salt and hashes the password using bcrypt, replacing the original plain text password.

So the database never stores the user's actual password — only a secure, hashed version. 🔐
*/


module.exports = mongoose.model('User', UserSchema);