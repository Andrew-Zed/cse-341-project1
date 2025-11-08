const express = require('express')
const router = express.Router();

const userscontroller = require('../controllers/contacts');

router.get('/', userscontroller.getAll);

router.get('/:id', userscontroller.getSingle);

module.exports = router;
