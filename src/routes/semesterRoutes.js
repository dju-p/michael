const express = require('express');
const { body } = require('express-validator');
const semesterController = require('../controllers/semesterController');
const { validate } = require('../middleware/validator');

const router = express.Router();

// Validation rules
const semesterValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('year').isInt({ min: 2000, max: 2100 }).withMessage('Year must be between 2000 and 2100'),
  body('term').isIn(['Fall', 'Spring', 'Summer']).withMessage('Term must be Fall, Spring, or Summer'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').isISO8601().withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    })
];

// Routes
router.post('/', semesterValidationRules, validate, semesterController.createSemester);
router.get('/', semesterController.getAllSemesters);
router.get('/:id', semesterController.getSemesterById);
router.put('/:id', semesterValidationRules, validate, semesterController.updateSemester);
router.delete('/:id', semesterController.deleteSemester);

// Get users for a semester
router.get('/:id/users', semesterController.getSemesterUsers);

module.exports = { semesterRoutes: router };