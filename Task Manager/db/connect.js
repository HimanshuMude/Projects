const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url, ({
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }))
}


module.exports = { connectDB }