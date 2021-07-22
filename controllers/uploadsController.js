const path = require('path');

const uploadPhotoProfile = (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
        return res.status(400).json({ message: 'No hay photo que subir...' });
    }

    const { photo } = req.files;

    // TODO: Validar Extensión
    const nombreSeparado = photo.name.split('.');
    const extension = nombreSeparado[nombreSeparado.length - 1];
    const extensionesPermitidas = ['png', 'jpg', 'jpeg'];
    if (!extensionesPermitidas.includes(extension)) {
        return res.status(400).json({
            message: `El archivo enviado no es una imagen, solo archivos con extensión: ${extensionesPermitidas}`
        })
    }

    const uploadPath = path.join(__dirname, '../uploads/', photo.name);

    photo.mv(uploadPath, function (err) {
        if (err) {
            console.log(error)
            return res.status(500).join(err);
        }

        res.json({ message: 'File uploaded! to ' + uploadPath });
    });
}


module.exports = { uploadPhotoProfile }