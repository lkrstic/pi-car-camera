const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const AuthorizedSchema = new Schema({
    plate:
    {
        type: String,
        required: true,
    },
    ownership:
    {
        type: String,
        required: true,
    },


}
);

const Authority = mongoose.model('Authority', AuthorizedSchema)

module.exports = Authority;