import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Header from '../components/Header';
import Footer from '../components/Footer';


const MainLayout = () => {
    const { auth, loading } = useAuth()

    //Here we put a spinner
    if (loading) return 'Loading...'

    return (
        <>
            <Header />
            {auth?._id ? (
                <main className='container px-4 md:mx-10 my-5 md:my-20'>
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />
        </>
    )
}

export default MainLayout;