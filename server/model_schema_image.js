const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    plate:
    {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
        required: true,
    },

    make:
    {
        type: String,
        required: true,
    }


},
    {
        timestamps: true,
    }
);

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image;