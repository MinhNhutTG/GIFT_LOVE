const mongoose = require('mongoose');

const templateSchema  = new mongoose.Schema({
    title: String,
    type: String,
    description:String,
    previewUrl: String,
    deleted: {  type: Boolean, default: false },
    isActive: {  type: Boolean, default: true },
    fields: Array,
})
const Template = mongoose.model("Template", templateSchema, "templates");

module.exports = Template;