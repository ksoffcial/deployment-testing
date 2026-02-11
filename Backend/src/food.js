const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const foodSchema = new Schema({
    name: {
        type: String,
        requied: true
    },
    price: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["veg", "non-veg", "vegan"],
        default: "veg"
    },
    description: {
        type: String
    },

},{timestamps:true});

const Food = mongoose.model("fooditem",foodSchema);

module.exports = Food;