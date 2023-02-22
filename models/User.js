import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: { 
        type: String,
        unique: true,
        validate: {
            validator: (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
            message: "Please enter a valid email address"
        }
    },
    password:{
        type: String
    },
    admin: { 
        type: Boolean,
        default: false
    },
    
},{versionKey: false})
const User = mongoose.model("User", userSchema);

export const getAll = async () => {
    const users = await User.find();
    return users;
};
export const create = async (document) => {    
    const newUser = new User(document);
    const result = await newUser.save();
    return result._doc;
    
};
export const getOne = async (filter) => {
    const user = await User.findOne(filter);
    return user;
};
export const replace = async (userId, data) => {
    const user = await User.findOneAndReplace({_id: userId}, data, {returnDocument: "after", runValidators: true},);

    return user;
};
export const update = async (userId, data) => {
    const user = await User.findByIdAndUpdate(userId, data, {new: true, runValidators: true});

    return user;
};
export const deleteOne = async (userId) => {
    const user = await User.findByIdAndDelete(userId)

    return user;
};

export default User;
