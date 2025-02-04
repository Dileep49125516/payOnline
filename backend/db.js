require("dotenv").config();
const mongoose=require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
   .then(()=>console.log("MongoDB connected"))
   .catch((error)=>console.log(error));

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    photo:{
        type:String,
        required:false
    }
    
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

  const Account=mongoose.model("Account",accountSchema);
  const User=mongoose.model("User",userSchema);
  module.exports={User,Account};