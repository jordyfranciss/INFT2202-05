import { validationResult } from 'express-validator'; // Import validationResult

import { body } from 'express-validator';


// Validation rules for animals (adjust as needed)
export const rules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('species').notEmpty().withMessage('Species is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

// Middleware for validation
export const checkValidation = (validationRules) => {
  return (req, res, next) => {
    // Apply the validation rules
    validationRules.forEach(rule => rule.run(req));
    const errors = validationResult(req);

    // If errors are found, return a 400 with error details
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); // Continue if no errors
  };
};
