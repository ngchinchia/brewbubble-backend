/* This code is used for validation check of first name, last name, email, password */
const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("first")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first name is required")
    .isString()
    .isLength({ min: 4, max: 20 })
    .withMessage("First Name must be 4-20 character"),
  check("last")
    .trim()
    .not()
    .isEmpty()
    .withMessage("last name is required")
    .isString()
    .isLength({ min: 4, max: 20 })
    .withMessage("Last Name must be 4-20 character"),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is required")
    .withMessage("This is invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be minimum 8 characters"),
];

exports.userValidation = (req, res, next) => {
  console.log(req.body);
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password is required'),
  check('password').trim().not().isEmpty().withMessage('email / password is required')
]
