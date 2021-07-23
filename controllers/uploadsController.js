const uploadFile = require("../helpers/uploadFile");


const uploadPhotoProfile = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ message: 'No hay photo que subir...' });
    }
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


module.exports = { uploadPhotoProfile }