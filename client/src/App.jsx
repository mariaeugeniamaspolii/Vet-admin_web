import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"

import Login from "./views/Login"
import Register from "./views/Register"
import AccountConfirmation from "./views/AccountConfirmation"
import ResetPassword from "./views/ResetPassword"
import NewPassword from "./views/NewPassword"

import PatientsAdmin from "./views/PatientsAdmin"

import { AuthProvider } from "./context/AuthProvider"
import { PatientsProvider } from "./context/PatientsProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <PatientsProvider>
        <Routes>

          //*PUBLIC
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account-confirmation/:id" element={<AccountConfirmation />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="reset-password/:token" element={<NewPassword />} />
          </Route>

          //*PRIVATE
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<PatientsAdmin />} />
          </Route>

        </Routes>
      </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
