const express=require("express");
const zod=require("zod");
const path = require("path");
const multer=require("multer");
const bcrypt=require("bcrypt");
const {User,Account} =require("../db");
const JWT_SECRET=require("../config");
const jwt=require("jsonwebtoken");
const {outMiddleware}=require("../middleware");
const app=express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

const router=express.Router();
const signupSchema=zod.object({
   username:zod.string().email(),
   password:zod.string(),
   firstName:zod.string(),
   lastName:zod.string()
})
const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});
router.post("/signUp",async(req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken/Incorrect inputs"
        })
    }
    const user=await User.findOne({
        username:body.username
    })
    if(user){
        return res.status(411).json({
            message:"Email already taken/Incorrect inputs"
        })
    }
    const hashedpassword=await bcrypt.hash(req.body.password,10);
    const dbUser =await User.create({
        username:req.body.username,
        password:hashedpassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    });
    await Account.create({
        userId:dbUser._id,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET);

    res.status(200).json({
        message:"user created successfully",
        token:token
    })
})

router.post("/login", async(req,res)=>{
   const body=req.body;
   const {success} =signInSchema.safeParse(req.body);
   if(!success){
    res.status(411).json({
        message:"Invalid Inputs"
    });}
    try{
    const user=await User.findOne({username:body.username});
    if(!user){
     res.status(411).json({
        message:"Username doesn't exist"
     });
    }
    const set=await bcrypt.compare(body.password,user.password);
    if(!set){
        res.status(411).json({
            message:"Incorrect password"
        });
    }
    const token = jwt.sign(
        {
         userId:user._id,
        },
        JWT_SECRET,
        { expiresIn: "12h" }
    );
    res.status(200).json({
      message:"Login successfully",
      token:token
    });}
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
})

const updateBody=zod.object({
   password:zod.string().optional(),
   firstName:zod.string().optional(),
   lastName:zod.string().optional(),
   photo:zod.string().optional()
})
router.put("/update", outMiddleware, upload.single("photo"), async (req, res) => {
    const body = req.body;
    const { success } = updateBody.safeParse(body);
    if (!success) {
      return res.status(403).json({
        message: "Error while updating information"
      });
    }
    const updateData = { ...body };
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }
   try {
      await User.updateOne({ _id: req.userId }, { $set: updateData });
  
      res.status(200).json({
        message: "Updated successfully",
        photoPath: updateData.photo,
        profile:body.firstName
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating user",
        error: error.message
      });
    }
  });
router.get("/rupee", outMiddleware, async (req, res) => {
    try {
      const account = await Account.findOne({userId:req.userId});
       console.log("Account",account);
      if (!account) {
        return res.status(404).json({ message: "No account found" });
      }
      return res.status(200).json({error:"successfully",value:account.balance});
      } catch (error) {
      console.error("Error fetching account:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter||"";

    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter,$options: "i"
           }
         },{
            lastName:{
                "$regex":filter,$options: "i"
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})


module.exports=router;