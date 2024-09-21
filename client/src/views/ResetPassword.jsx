import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axios';

import Button from '../components/Button'
import Alert from '../components/Alert'

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email.trim() === '' || email.length < 6) {
            setAlert({ msg: 'Email is required', type: 'error' })
            return
        }

        try {
            const { data } = await axiosClient.post('/veterinarians/reset-password', { email });
            setAlert({ msg: data.msg, type: 'success' })
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                type: 'error'
            })
        }
    }
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Regain your access and don't lose <span className="text-black">your patients.</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {alert.msg && <Alert alert={alert} />}

                <form>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Email
                        </label>
                        <input type="text" placeholder="Register Email" value={email} onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="" />
                    </div>

                    <Button onClick={handleSubmit} label="Send instructions" />
                </form>

                <nav className='mt-5 lg:flex lg:justify-between'>
                    <Link to="/" className='block text-center text-gray-500'> Already have an account? <span className="text-indigo-500">Login</span></Link>
                    <Link to="/register" className='block text-center text-gray-500'> Don't have an account? <span className="text-indigo-500">Register</span></Link>
                </nav>
            </div>
        </>
    )
}

export default ResetPassword