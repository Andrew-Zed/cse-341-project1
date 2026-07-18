const { body, param, validationResult } = require('express-validator');

const contactValidationRules = [
    body('firstName').trim().notEmpty().withMessage('firstName is required').isString()
        .isLength({ min: 3 }).withMessage('firstName must be at least 3 characters long'),
    body('lastName').trim().notEmpty().withMessage('lastName is required').isString()
        .isLength({ min: 3 }).withMessage('lastName must be at least 3 characters long'),
    body('email').trim().notEmpty().withMessage('email is required').isEmail().withMessage('email must be a valid email address'),
    body('favoriteColor').trim().notEmpty().withMessage('favoriteColor is required').isString(),
    body('birthday').trim().notEmpty().withMessage('birthday is required'),
];

const idValidationRule = [
    param('id').isMongoId().withMessage('id must be a valid MongoDB ObjectId'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    contactValidationRules,
    idValidationRule,
    validate,
};
