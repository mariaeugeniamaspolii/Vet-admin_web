import mongoose, { Schema } from "mongoose";

//Set Schema
const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    caretaker: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    animal: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        trim: true,

    },
    symptoms: {
        type: String,
        default: null,
    },
    veterinarian: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinarians',
    },
});

//Register on mongoose
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;