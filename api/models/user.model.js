import mongoose from 'mongoose';

// define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20 ,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePicture: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

// create the user moldel using the schema
const User = mongoose.model('User', userSchema);
// export the user model
export default User;