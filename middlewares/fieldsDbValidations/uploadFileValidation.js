const { existUserById } = require("./authValidations");
const { existProductById } = require("./productValidations");

const allowedCollection = async (collection = '', allowedCollections = []) => {

    if (!allowedCollections.includes(collection)) {
        throw new Error('La collección no esta permitido');
    }

    return true;
}


const idsExitsCollections = async (id, petition) => {
    const { collection } = petition.req.params
    if (collection === 'product') {
        return existProductById(id);
    }
    if (collection === 'user') {
        return existUserById(id);
    }

    return true;

}

const fileRequestValidation = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ message: 'No hay archivo que subir...' });
    }

    next();
}


module.exports = { allowedCollection, idsExitsCollections, fileRequestValidation };
