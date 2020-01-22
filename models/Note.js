var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    _headlineID: {
        type: Schema,
        Types,
        ObejctID,
        ref: "HeadLine"
    },
    date: String,
    noText: String
});

var Headline = mongoose.model("Headline", noteSchema);

module.exports = Note;