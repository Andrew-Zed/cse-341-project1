const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users');
const { contactValidationRules, idValidationRule, validate } = require('../middleware/validators');

router.get('/', usersController.getAll);

router.get('/:id', idValidationRule, validate, usersController.getSingle);

router.post('/', contactValidationRules, validate, usersController.createUser);

router.put('/:id', idValidationRule, contactValidationRules, validate, usersController.updateUser);

router.delete('/:id', idValidationRule, validate, usersController.deleteUser);



module.exports = router;
