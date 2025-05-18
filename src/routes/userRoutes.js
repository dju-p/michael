const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { validate } = require('../middleware/validator');

const router = express.Router();

// Validation rules
const userValidationRules = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  body('role').optional().isIn(['student', 'teacher', 'admin']).withMessage('Role must be student, teacher, or admin')
];

// Routes
router.post('/', userValidationRules, validate, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidationRules, validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Add/Remove semesters for user
router.post('/:userId/semesters/:semesterId', userController.addSemesterToUser);
router.delete('/:userId/semesters/:semesterId', userController.removeSemesterFromUser);

module.exports = { userRoutes: router };