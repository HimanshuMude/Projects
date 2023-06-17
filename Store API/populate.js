require('dotenv').config()

const connectDB=require("./db/connect");
const product=require("./models/product");
const jsonProd=require("./products.json");

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI).then(()=>{
            console.log("Connected");
        });

        await product.deleteMany();
        await product.create(jsonProd)

        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();