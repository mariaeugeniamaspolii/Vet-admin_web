import express from 'express'
import {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} from "../controllers/patientController.js"
import checkAuth from "../middleware/authJwt.js"

const router = express.Router();

// * PRIVATE
router.route("/")

    .post(checkAuth, async (req, res) => {
        try {
            const patient = await createPatient(req);
            
            res.json(patient);
        } catch (error) {   
            console.log(error);
            res.status(500).json({
                error
            });
        }
    })

    .get(checkAuth, async (req, res) => {
        try {
            const patients = await getPatients(req.query);
            res.json( patients );
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
    });

router.route("/:id")

    .get(checkAuth, async (req, res) => {
        try {
            const patient = await getPatientById(req.params.id);

            // Deny access to patients info unless it't their veterinarian
            // if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
            //     return res.json({ msg: "You cannot access this patient"})
            // }

            patient ? res.json({ patient }) : res.json({ msg: "Patient not found" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
    })

    .put(checkAuth, async (req, res) => {
        try {
            const patient = await updatePatient(req.params.id, req.body);
            console.log('patient: ', patient);
            !patient && res.json({ msg: "Patient not found" });
            
            console.log('patient.veterinarian: ', patient.veterinarian._id.toString());
            // Deny access to patients info unless it't their veterinarian
            if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
                return res.json({ msg: "You cannot access this patient"})
            }
            
            return res.json({ patient });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
    })

    .delete(checkAuth, async (req, res) => {
        try {
            const patient = await deletePatient(req.params.id);

            if (!patient || patient.deletedInfo) {
                return res.json({ msg: "Patient not found" });
            }            
            // Deny access to patients info unless it't their veterinarian
            if(patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
                    return res.json({ msg: "You cannot access this patient"})
                }
                
            return res.json({ msg: "Patient deleted successfully" });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
    })

export default router;