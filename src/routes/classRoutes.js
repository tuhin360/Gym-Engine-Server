const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getClasses);
router.get('/featured', classController.getFeaturedClasses);

module.exports = router;
