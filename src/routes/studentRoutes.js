const express = require('express');
const router = express.Router();

// Correct import statement (adjust the path as needed based on your file structure)
const studentController = require('../controllers/studentController');

// POST /api/students - Create a new student
router.post('/', studentController.createStudent);

// GET /api/students - Get all students
router.get('/', studentController.getAllStudents);

// GET /api/students/birthdays - Get upcoming birthdays
router.get('/birthdays', studentController.getUpcomingBirthdays);

// GET /api/students/gender/:gender - Get students by gender
router.get('/gender/:gender', studentController.getStudentsByGender);

// GET /api/students/:roll_no - Get single student
router.get('/:roll_no', studentController.getStudent);

// PUT /api/students/:roll_no - Update student
router.put('/:roll_no', studentController.updateStudent);

// DELETE /api/students/:roll_no - Delete student
router.delete('/:roll_no', studentController.deleteStudent);

module.exports = router;