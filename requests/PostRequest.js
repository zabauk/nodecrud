const { validationResult, body } = require('express-validator')


exports.createValidate = [
    body('title')
    .notEmpty()
    .withMessage('title is required and min 5 chars'),
    body('description')
    .isLength({min:5})
    .withMessage('min 5 chars and max 100 chars'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];
