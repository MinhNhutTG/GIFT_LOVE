const Template = require("../../models/template.model");
const Gift = require("../../models/gift.model");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../../config/aws-s3");
const mime = require('mime-types');
const { randomUUID } = require('crypto');
const path = require('path');

require("dotenv").config();

module.exports.createLetter = async (req, res) => {

    const id = req.params.idtemplate;

    let find = {
        _id: id,
        isActive: true,
    };

    const template = await Template.findOne(find);
    const fields = template.fields;

    res.render("./client/pages/form.pug", {
        typeTemplate: template.type,
        fields: fields,
    });
}



module.exports.postCreateLetter = async (req, res) => {

    function folderForMime(mimetype) {
        if (!mimetype) return 'others';
        if (mimetype.startsWith('image/')) return 'Images';
        if (mimetype.startsWith('audio/')) return 'Sound';
        if (mimetype.startsWith('video/')) return 'Video';
        return 'others';
    }
    function makeKey(folder, originalName, mimetype) {

        const ext = path.extname(originalName) || (mime.extension(mimetype) ? '.' + mime.extension(mimetype) : '');
        const id = Date.now() + '-' + randomUUID();
        return `${folder}/Guest/${id}${ext}`;
    }

    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            const bucket = process.env.AWS_BUCKET_NAME;
            const results = [];

            for (const file of req.files) {
                const folder = folderForMime(file.mimetype);

                const key = makeKey(folder, file.originalname, file.mimetype);

                const params = {
                    Bucket: bucket,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    Metadata: {
                        originalname: file.originalname,
                    },
                };

                const cmd = new PutObjectCommand(params);
                await s3.send(cmd);

                const url = `https://${bucket}.s3.${process.env.REGION_AWS3}.amazonaws.com/${encodeURIComponent(key)}`;
                console.log('File uploaded successfully. URL:', url);
                results.push({
                    fieldname: file.fieldname,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    key,
                    url
                });

            }
            let gift = new Gift({
                typeTemplate : req.body.typeTemplate,
                toName : req.body.toName,
                song : req.body.song,
                message : req.body.message,
                resource : results,
            }
            );
            await gift.save();
            res.send("Upload thành công");
    }

    }
    catch (err) {
    console.error(err);
}

}

