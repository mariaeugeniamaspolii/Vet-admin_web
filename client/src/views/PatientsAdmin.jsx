import { useState } from 'react';
import Button from '../components/Button';
import Form from '../components/Form'
import PatientsList from '../components/PatientsList'

const PatientsAdmin = () => {

    const [showForm, setShowForm] = useState(true)
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto ">
            <div className="md:hidden">
                <Button onClick={() => setShowForm(!showForm)} label={showForm ? 'Hide Form' : 'Show Form'} />
            </div>
            <div className={`${showForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`} >
                <Form />
            </div>
            <div className="md:w-1/2">
                <PatientsList />
            </div>
        </div>
    )
}

export default PatientsAdmin