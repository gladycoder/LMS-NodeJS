const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminRegisterController');

router.get('/admin',adminController.getAdmin);
router.post('/createAdmin',adminController.createAdmin);
router.post('/loginAdmin',adminController.loginAdmin);
router.put('/adminLogout',adminController.logoutAdmin);
module.exports = router;