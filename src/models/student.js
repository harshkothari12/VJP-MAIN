const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    roll_no: {
        type: Number,
        required: [true, 'Roll number is required'],
        unique: true,
        min: [1, 'Roll number must be positive']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function(v) {
                return v <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender must be either male or female'
        },
        required: [true, 'Gender is required']
    },
    institute: {
        type: String,
        default: 'વિરતી જૈન પાઠશાળા',
        required: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for age calculation
studentSchema.virtual('age').get(function() {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

module.exports = mongoose.model('Student', studentSchema);