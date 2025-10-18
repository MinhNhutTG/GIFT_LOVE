// [GET] /admin/dashboard
const Gift = require("../../models/gift.model");

module.exports.gift = async (req,res)=>{
    let typeTemplate = "";
    const id = req.params.id;
    let find = {
        _id: id,
        isDeleted: false,
        isFinite: true,
    }
    const gift = await Gift.findById(find);

    typeTemplate = gift.typeTemplate;

    res.render(`./client/pages/templates/${typeTemplate}.pug`,{
        gift: gift,
    });
}