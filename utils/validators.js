const { check } = require("express-validator");

exports.userValidator = [
  check("username", "Username must be minimum 6 symbols").trim(),
  check("password", "Password must be minimum 6 characters")
    .isLength({ min: 6 })
    .isAlphanumeric()
    .trim(),
];

exports.cityValidator = [
  check("city", "You have this city in Your list").trim().isLength({ min: 1 }),
  check("state", "State can't be empty").trim().isLength({ min: 1 }),
  check("activePort", "Port can't be empty").trim().isLength({ min: 1 }),
  check("deliveryPrice", "Price can't be empty and must be number")
    .trim()
    .isNumeric()
    .isLength({ min: 1 }),
];

exports.portValidator = [
  check("port", "Port name can't be empty").trim().isLength({ min: 1 }),
];

exports.fobValidator = [
  check("minValue", "Minimum Value is required").trim().isLength({ min: 1 }),
  check("additionalFee1", "additionalFee1 is required")
    .trim()
    .isLength({ min: 1 }),
  check("additionalFee2", "additionalFee2 is required")
    .trim()
    .isLength({ min: 1 }),
  check("additionalFee3", "additionalFee3 is required")
    .trim()
    .isLength({ min: 1 }),
  check("additionalFee4", "additionalFee4 is required")
    .trim()
    .isLength({ min: 1 }),
];
