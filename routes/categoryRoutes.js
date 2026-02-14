const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/trips/:name', categoryController.getCategoryTrips);

module.exports = router;
