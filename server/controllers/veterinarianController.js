import Veterinarian from '../models/Veterinarian.js';
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';
import emailRegister from '../helpers/emailRegister.js';
import emailResetPassword from '../helpers/emailResetPassword.js';

const createVet = async (req, res) => {

    //Prevent duplicated email
    const {
        email,
        name
    } = req.body
    const vetExist = await Veterinarian.findOne({
        email
    })

    if (vetExist) {
        const error = new Error("User already registered");
        return res.status(400).json({
            msg: error.message
        });
    }

    try {
        const newVeterinarian = new Veterinarian(req.body);
        await newVeterinarian.save();

        //Send email
        emailRegister({
            email,
            name,
            token: newVeterinarian.token
        })

        res.json(newVeterinarian);
    } catch (error) {
        console.log(error);
    }
};

const profile = async (req, res) => {
    const {
        veterinarian
    } = req
    try {
        await res.json(veterinarian);
    } catch (error) {
        console.log(error);
    }
};

const confirmation = async (req, res) => {
    const {
        token
    } = req.params;

    const vetConfirmation = await Veterinarian.findOne({
        token
    });

    if (!vetConfirmation) {
        const error = new Error('Token not found');
        return res.status(404).json({
            msg: error.message
        });
    }
    try {

        vetConfirmation.token = null;
        vetConfirmation.verified = true;
        await vetConfirmation.save();

        await res.json({
            msg: "Account confirmed successfully"
        });
    } catch (error) {
        console.log(error);
    }
};

const authVet = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    // Check if user exist
    const veterinarian = await Veterinarian.findOne({
        email
    });

    if (!veterinarian) {
        const error = new Error("User does not exist");
        return res.status(404).json({
            msg: error.message
        });
    }

    // Check if user is verified
    if (!veterinarian.verified) {
        const error = new Error("This account has not been verified yet");
        return res.status(403).json({
            msg: error.message
        });
    }

    // Check password
    if (await veterinarian.comparePassword(password)) {
        
        // Authenticate
        veterinarian.token = generateJWT(veterinarian.id)
        
        res.json({
            _id: veterinarian._id,
            name: veterinarian.name,
            email: veterinarian.email, 
            token: veterinarian.token, 
            telephone: veterinarian.telephone, 
            web: veterinarian.web, 
        })
    } else {
        const error = new Error("Password is not correct");
        return res.status(403).json({
            msg: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;

    const veterinarianExists = await Veterinarian.findOne({
        email
    });
    if (!veterinarianExists) {
        const error = new Error("User does not exist");
        return res.status(400).json({
            msg: error.message
        });
    }
    try {
        veterinarianExists.token = generateId();
        await veterinarianExists.save();

        //Send email new password
        emailResetPassword({
            email,
            name: veterinarianExists.name,
            token: veterinarianExists.token
        })

        res.json({
            msg: "Email sent with instructions"
        })
    } catch (error) {
        console.log('error: ', error);

    }
}

const checkToken = async (req, res) => {

    const {
        token
    } = req.params;
    const validToken = await Veterinarian.findOne({
        token
    });

    if (validToken) {
        res.json({
            msg: "Valid token, user does exist"
        })
    } else {
        const error = new Error("Invalid token");
        res.status(400).json({
            msg: error.message
        })
    }
}

const setNewPassword = async (req, res) => {

    const {
        token
    } = req.params;
    const {
        password
    } = req.body;
    console.log('password: ', password);

    if (!password) {
        return res.status(400).json({
            msg: "Please provide a new password"
        });
    }
    console.log('password2: ', password);


    const veterinarian = await Veterinarian.findOne({
        token
    });
    if (!veterinarian) {
        const error = new Error("There was an error");
        return res.status(400).json({
            msg: error.message
        });
    };

    try {
        veterinarian.token = null;
        veterinarian.password = password;
        await veterinarian.save();
        res.json({
            msg: "Password successfully updated"
        })
    } catch (error) {
        console.log(error);
    }
};


export {
    createVet,
    profile,
    confirmation,
    authVet,
    resetPassword,
    checkToken,
    setNewPassword,
}