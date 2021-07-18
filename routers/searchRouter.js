const { Router } = require('express');
const searchKeywords = require('../controllers/searchController');
const searchRouter = Router();

searchRouter.get('/:module/:searchable', searchKeywords);

module.exports = searchRouter;
