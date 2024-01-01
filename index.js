const express=require("express");
const port=5000;
const app=express();

const db=require("./config/mongoose");

//middleware to handle CORS policy
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.urlencoded());
app.use(express.json());
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log("Error server is not started",err);
    }
    console.log(`server is up on Port:${port}`);
})