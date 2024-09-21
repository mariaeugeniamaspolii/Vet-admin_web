import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";

const PatientsContext = createContext()

export const PatientsProvider = ({ children }) => {

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('apv_token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
                const { data } = await axiosClient('/patients', config)
                console.log('DATA: ', data);
                setPatients(data);
            } catch (error) {

            }
        }
        getPatients()
    }, [])

    const savePatient = async (patient) => {
        const token = localStorage.getItem('apv_token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
        try {
            const { data } = await axiosClient.post('/patients', patient, config)
            console.log('DAT: ', data);
            const { createdAt, updatedAt, __v, ...savedPatient } = data

            setPatients([savedPatient, ...patients])
        } catch (error) {
            console.log(error); // Agregar esta línea para imprimir el error en la consola
            console.log('error: ', error.response.data.msg);
        }
    }

    const setEdit = (patient) => {
        setPatient(patient)

    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdit,
                patient,

            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext;