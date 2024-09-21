import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosClient from '../config/axios';

import Alert from '../components/Alert';
import Button from '../components/Button';

const Login = () => {

    const [alert, setAlert] = useState({})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAuth} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([ email, password].includes('')){
            setAlert({ msg: 'All fields are required.', type: 'error' });
            return;
        }

        try {
            const {data} = await axiosClient.post('/veterinarians/login', {email, password})
            localStorage.setItem('apv_token', data.token);
            setAuth(data)
            setAlert({ msg: 'Welcome jane.', type: 'success' });

            navigate('/admin');
        } catch (error) {
            setAlert({ msg: 'Wrong email or password.', type: 'error' });
        }
    }
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Login to admin your <span className="text-black">patients</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alert.msg &&
                    <Alert alert={alert} />
                }
                <form action="">
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Email
                        </label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Register Email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Password
                        </label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                    </div>

                    <Button onClick={handleSubmit} label="Login" />

                </form>
                <nav className='mt-5 lg:flex lg:justify-between'>
                    <Link to="/register" className='block text-center text-gray-500'> Don't have an account? <span className="text-indigo-500">Register</span></Link>
                    <Link to="/reset-password" className='block text-center text-gray-500'> Forgot my password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login