const express = require("express");
const cors=require("cors");

const PORT=3000;
const app=express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const mainRouter=require("./routes/index");
app.use("/api/v1",mainRouter);
app.listen(PORT,function(err){
    if(err) console.log(err);
    console.log("server listening on port",PORT);
});



