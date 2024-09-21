import Patient from "../models/Patient.js";

// Array fields to load to the request
const populateFields = [{
    path: "veterinarian",
    // select: ["name", "email"] // in this case we get all information
}];

const buildPatientParams = (params) => ({
    name: params.name,
    caretaker: params.caretaker,
    email: params.email,
    animal: params.animal,
    age: params.age,
    symptoms: params.symptoms,
    date: params.date,
    veterinarian: params.veterinarian,
});

// Find patients
const getPatients = async (params) => {
    const query = {};
    if (params.veterinarian) {
        query.veterinarian = params.veterinarian;
    }
    const patients = await Patient.find(query)
        .populate(populateFields)
        .exec();
    return patients;
};

// Find patient by ID
const getPatientById = async (patientId) => {
    const patient = await Patient.findById(patientId)
        .populate(populateFields)
        .exec();
    return patient;
};

// Create patient
// Create patient
const createPatient = async (params) => {
    const newPatient = new Patient(buildPatientParams(params.body));
    newPatient.veterinarian = params.veterinarian._id
    await newPatient.save();
    return newPatient;
};


// Update patient
const updatePatient = async (patientId, params) => {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, buildPatientParams(params), {new: true});
    return updatedPatient;
};

// Delete patient
const deletePatient = async (patientId) => {
    const deletedInfo = await Patient.deleteOne({ _id: patientId });
    return {
        message: "Patient deleted successfully",
        deletedInfo
    };
};

export {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};