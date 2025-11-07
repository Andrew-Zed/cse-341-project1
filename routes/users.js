const express = require('express')
const router = express.Router();

const userscontroller = require('../controllers/users');

router.get('/', userscontroller.getAll);

router.get('/:id', userscontroller.getSingle);

module.exports = router;
