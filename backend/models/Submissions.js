const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    object: {
        type: Object,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model("Formschema", formSchema);