import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axiosClient from '../config/axios';
import Alert from '../components/Alert'
import Button from '../components/Button'
const AccountConfirmation = () => {
    const [confirmedAccount, setConfirmedAccount] = useState(false)
    const [loader, setLoader] = useState(true)
    const [alert, setAlert] = useState({})

    const params = useParams()
    const { id } = params

    const handleClick = () => {
        setAlert(true)
    }
    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await axiosClient(`/veterinarians/confirmation/${id}`)
                setConfirmedAccount(true)
                setAlert({
                    msg: data.msg,
                    type: "success"
                })

            } catch (error) {
                console.log('error: ', error);
                setAlert({
                    msg: error.response.data.msg,
                    type: 'error',
                })
            }

            setLoader(false)
        }
        confirmAccount()
    }, [])
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Login to admin your <span className="text-black">patients</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!loader && <Alert alert={alert} />}

                {confirmedAccount && (
                    <Link to="/" className='block text-center text-gray-500'>
                        <Button label="Login" onClick=""/>
                    </Link>
                )}
            </div>
        </>
    )
}

export default AccountConfirmation