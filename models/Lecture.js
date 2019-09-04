const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LectureSchema = new Schema({
    no:{
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    course : { type: Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps : { uploadedAt: 'created_at'}});

module.exports = Lecture = mongoose.model('lectures',  LectureSchema)
