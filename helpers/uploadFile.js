const path = require('path');
const { v4: uuid } = require('uuid');

const myAllowedExtensions = ['png', 'jpg', 'jpeg', 'txt', 'gif', 'md', 'pdf']

const uploadFile = (files, allowedExtensions = myAllowedExtensions, folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        // TODO: Validar Extensión
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        if (!allowedExtensions.includes(extension)) {
            return reject(`Error al subir archivo ${file.name}, intenta subir archivos con extensines: ${allowedExtensions}`)
        }

        const fileName = `${uuid()}.${extension}`;

        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

        file.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(fileName);
        });
    })

}

module.exports = uploadFile;
