const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes=require("./routes/transactionRoutes");


require("dotenv").config();
require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/transactions",transactionRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
});