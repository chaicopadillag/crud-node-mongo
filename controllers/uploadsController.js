const path = require('path');
const fs = require('fs');

const uploadFile = require("../helpers/uploadFile");
const User = require("../models/user");
const Product = require("../models/product");


const uploadFilePhoto = async (req, res) => {

    try {
        const fileName = await uploadFile(req.files, undefined, 'img');

        return res.json({
            fileName
        });

    } catch (error) {
        return res.status(400).json({
            error
        });
    }
}

const updateFilePhotoToModel = async (req, res) => {
    const { collection, id } = req.params;

    let model = null;
    switch (collection) {
        case 'user':
            model = await User.findById(id);
            break;
        case 'product':
            model = await Product.findById(id);
            break;

        default:
            return res.status(401).json({ message: 'La collección no existe' });
    }

    if (model.imgUrl) {
        const pathImg = path.join(__dirname, '../uploads', `${collection}s`, model.imgUrl);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const fileName = await uploadFile(req.files, undefined, `${collection}s`);
    model.imgUrl = fileName;
    model.save();

    res.json({
        message: 'Imagen actualizado',
        model
    })
}

const showFileImageModel = async (req, res) => {
    const { collection, id } = req.params;

    let model = null;
    switch (collection) {
        case 'user':
            model = await User.findById(id);
            break;
        case 'product':
            model = await Product.findById(id);
            break;

        default:
            return res.status(401).json({ message: 'La ruta del Imagen no existe' });
    }

    if (model.imgUrl) {
        const pathImg = path.join(__dirname, '../uploads', `${collection}s`, model.imgUrl);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    return res.sendFile(path.join(__dirname, '../public/assets/img/image-default.jpg'))

}


module.exports = { uploadFilePhoto, updateFilePhotoToModel, showFileImageModel }