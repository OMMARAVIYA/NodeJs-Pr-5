const express = require('express');

const router = express.Router();

const fileUpload = require('../config/fileUpload');

const crudcontroller = require('../controllers/CrudController');

router.get('/', crudcontroller.index);
router.post('/InsertData', fileUpload, crudcontroller.AddRecord);
router.get('/deleteData', crudcontroller.deleteData);
router.get('/editData', crudcontroller.editData);

module.exports = router;