import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },

},{
    timestamps: true // will add created date, updated date
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){ // the password is checked just right before it is saved in database (values are taken, just needed to save them, and at that point this happens)
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){ // adding a custom matchPassword method to the userSchema
    return await bcrypt.compare(enteredPassword, this.password); // returns true if same, else returns false
}

const User = mongoose.model('User', userSchema);

export default User;