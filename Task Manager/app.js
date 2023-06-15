const { connectDB } = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound=require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static("./public"))
app.use(express.json());



//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server Running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
