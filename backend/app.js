require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


const dbUrl = process.env.MONGO_URL;


app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/charges", require("./routes/chargeRoutes"));



main()
.then((res)=>{
    console.log(res);
    console.log("db working");
})
.catch((err)=>{
    console.log(err);
    console.log("db error");
});


async function main(){
    await mongoose.connect(dbUrl);
};


app.get('/',(req,res)=>{
    res.send('WORKING');
});



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
}); 
