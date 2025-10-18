const mongoose = require('mongoose');

const giftSchema  = new mongoose.Schema({
    typeTemplate: String,
    toName: String,
    song:String,
    message: String,
    resource: Array,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: {  type: Boolean, default: false },
    isActive: {  type: Boolean, default: true },
   
})
const Gift = mongoose.model("Gift", giftSchema, "gift");

module.exports = Gift;