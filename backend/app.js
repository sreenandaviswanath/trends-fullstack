const express = require("express");
const app = express();
app.use((req, res, next) => {
  // console.log("MY TRENDS SERVER RECEIVED A REQUEST");
   console.log(req.method, req.originalUrl);
   next();
});
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
  // console.log("REQUEST RECEIVED:", req.method, req.originalUrl);
  next();
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/products",productRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/api/v1/users",userRoutes);

app.use((err,req,res,next)=>{
res.status(500).json({
success:false,
message:err.message

})

})


module.exports = app;