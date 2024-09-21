import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { logout } = useAuth()

    return (
        <header className="py-4 px-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 capitalize">Vet admin</h1>

                <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 items-center">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">patients</Link>
                    <Link to="/profile" className="text-white text-sm uppercase font-bold">profile</Link>

                    <button value="Logout" onClick={logout} className="text-indigo-200 text-sm uppercase font-bold">Logout</button>

                </nav>
            </div>


        </header>
    )
}

export default Header