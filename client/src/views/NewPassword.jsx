import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axios';

import Alert from '../components/Alert'
import Button from '../components/Button'

const NewPassword = () => {

    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [validToken, setValidToken] = useState(false)
    const [modifiedPassword, setModifiedPassword] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const checkToken = async () => {
            try {
                await axiosClient(`/veterinarians/reset-password/${token}`)
                setAlert({
                    msg: 'Write your new password',
                })
                setValidToken(true)
            } catch (error) {
                setAlert({
                    msg: 'There was an error processing',
                    type: 'error',
                })
            }
        }
        checkToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.trim() === '' || password.length < 6) {
            setAlert({ msg: 'New password is required', type: 'error' })
            return
        }

        try {
            const { data } = await axiosClient.post(`/veterinarians/reset-password/${token}`, { password });
            setAlert({ msg: data.msg, type: 'success' })
            setModifiedPassword(true)
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
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Reset your <span className="text-black">password.</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alert.msg && <Alert alert={alert} />}
                {validToken &&
                    <>
                        <form>
                            <div className="my-5">
                                <label className=" text-gray-500 block text-xl font-bold">
                                    New Password
                                </label>
                                <input type="password" placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <Button onClick={handleSubmit} label="Reset password" />
                        </form>
                        {modifiedPassword &&
                            <Link to="/" className='block text-center text-gray-500'><span className="text-indigo-500">Login</span></Link>
                        }
                    </>
                }


            </div>
        </>
    )
}

export default NewPassword