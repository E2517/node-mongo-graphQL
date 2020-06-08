const mongoose = require("mongoose");

const programmers = mongoose.model("Programmer", {
    name: String,
    skills: String,
});

module.exports = {
    programmers,
};