const Template = require("../../models/template.model");


module.exports.createLetter = async (req, res) => {

    const id = req.params.idtemplate;

    let find = {
        _id: id,
        isActive: true,
    };

    const template = await Template.findOne(find);
    const fields = template.fields;
    
    console.log(fields);


    res.render("./client/pages/form.pug",{
        fields: fields,
    });
}