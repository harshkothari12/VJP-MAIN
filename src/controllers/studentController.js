const Student = require('../models/student');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({ 
            institute: 'વિરતી જૈન પાઠશાળા' 
        }).sort({ roll_no: 1 });
        
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get students by gender
exports.getStudentsByGender = async (req, res) => {
    try {
        const { gender } = req.params;
        
        if (!['male', 'female'].includes(gender)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid gender. Use male or female.'
            });
        }
        
        const students = await Student.find({ 
            gender: gender,
            institute: 'વિરતી જૈન પાઠશાળા'
        }).sort({ roll_no: 1 });
        
        res.status(200).json({
            success: true,
            count: students.length,
            gender: gender,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single student by roll_no
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ 
            roll_no: req.params.roll_no,
            institute: 'વિરતી જૈન પાઠશાળા'
        });
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { 
                roll_no: req.params.roll_no,
                institute: 'વિરતી જૈન પાઠશાળા'
            },
            req.body,
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ 
            roll_no: req.params.roll_no,
            institute: 'વિરતી જૈન પાઠશાળા'
        });
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get students with birthdays in the next 7 days (month-date only, year ignored)
exports.getUpcomingBirthdays = async (req, res) => {
    try {
        const today = new Date();
        const days = 7;
        const dateMonthSet = new Set();

        // Collect next 7 days' (date, month) pairs
        for (let i = 0; i < days; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            dateMonthSet.add(`${d.getDate()}-${d.getMonth() + 1}`);
        }

        const students = await Student.find({ institute: 'વિરતી જૈન પાઠશાળા' });

        // Filter by date-month only (year agnostic)
        const result = students.filter(student => {
            const dob = new Date(student.dob);
            const key = `${dob.getDate()}-${dob.getMonth() + 1}`;
            return dateMonthSet.has(key);
        });

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};