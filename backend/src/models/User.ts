import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: [true,"please enter name"],
        minlength:[3,"name shouldn't be less than 3 letters"],
        maxlength:[20,"name shouldn't be maore than 20 letters"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"please enter email"],
        unique:true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password:{
        type:String,
        trim:true,
        required:[true,"please enter password"],
        minlength:[6,"password shouldn't be less than 6 letters"]
    },
    isRegistered:{
        type:Boolean,
        default:false,

    }
},{timestamps:true})

export default mongoose.model("User",UserSchema);
