const express=require('express');
require('dotenv').config();
require("express-async-errors")
const app=express();
const PORT=process.env.PORT||3000
const notFoundMiddleware=require("./middleware/not-found");
const errorHandler=require("./middleware/error-handler");
const connectDB = require('./db/connect');

const productsRouter=require("./routes/products")


app.use(express.json());

app.get("/",(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
})

app.use("/api/v1/products",productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandler);


const start = async() => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();