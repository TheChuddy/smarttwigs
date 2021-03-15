const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/pingpong",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => console.log("mongoose connected to db")
);

module.exports = mongoose;
