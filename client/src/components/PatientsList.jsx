import usePatients from "../hooks/usePatients"

import Patient from './Patient'

const PatientsList = () => {

    const { patients } = usePatients()
    console.log('patients: ', patients);

    return (
        <>
            {patients.length ?
                <>
                    <h2 className="font-black text-3xl text-center capitalize">Patients List</h2>

                    <p className="text-xl mt-5 mb-10 text--center capitalize">patients administrator</p>
                    
                    {patients.map( patient => (
                        <Patient
                        key={patient._id}
                        patient={patient}
                        />
                    ))}
                </> :
                <>
                    <h2 className="font-black text-3xl text-center capitalize">there are no patients</h2>

                    <p className="text-xl mt-5 mb-10 text--center capitalize">add patients</p>
                </>
            }
        </>
    )
}

export default PatientsList