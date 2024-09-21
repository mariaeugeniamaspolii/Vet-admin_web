import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

//Set Schema
const veterinarianSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generateId(),
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

//Hash password
veterinarianSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarianSchema.methods.comparePassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
};

//Register on mongoose
const Veterinarian = mongoose.model("Veterinarians", veterinarianSchema);
veterinarianSchema.plugin(uniqueValidator);

export default Veterinarian;