import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('apv_token')
            if (!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }

            try {
                const { data } = await axiosClient('/veterinarians/profile', config)
                setAuth(data)
            } catch (error) {
                console.log('error: ', error);
                setAuth({})
            }
            setLoading(false)
        }
        authenticateUser()
    }, [])

    const logout = () => {
        localStorage.removeItem('apv_token')
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;