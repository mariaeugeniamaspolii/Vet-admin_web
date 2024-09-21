import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axios';

import Alert from '../components/Alert';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({ msg: "All fields are required", type: "error" });
            return;
        }

        if (password !== repeatPassword) {
            setAlert({ msg: "Passwords don't match", type: "error" });
            return
        }

        if (password.length < 6) {
            setAlert({ msg: "Password must be at least 6 characters", type: "error" });
            return;
        }
        setAlert({});

        try {
            const res = await axiosClient.post('/veterinarians', {name, email, password, repeatPassword });
            setAlert({
                msg: "Veterinarian successfully registered, check your email for confirmation",
                type: "success"
            })
        } catch (error) {
            console.log("error", error.response)
            setAlert({
                msg: error.response.data.msg,
                type: "error"
            })


            
        }
    }
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Login to admin your <span className="text-black">patients</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                { alert.msg && <Alert alert={alert} /> }
                
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Name
                        </label>
                        <input type="text" placeholder="Your Name" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Email
                        </label>
                        <input type="text" placeholder="Register Email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Password
                        </label>
                        <input type="password" placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label className=" text-gray-500 block text-xl font-bold">
                            Repeat Password
                        </label>
                        <input type="password" placeholder="Repeat Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </div>

                    <input type="submit" value="Register" className="w-full p-3 bg-indigo-700 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto" id="" />
                </form>

                <nav className='mt-5 lg:flex lg:justify-between'>
                    <Link to="/" className='block text-center text-gray-500'> Already have an account? <span className="text-indigo-500">Login</span></Link>
                    <Link to="/reset-password" className='block text-center text-gray-500'> Forgot my password</Link>
                </nav>
            </div>
        </>
    )
}

export default Register