import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import VerifyPage from './pages/VerifyPage'
import Forget_Password_Page from './pages/Forget_Password'

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/signup" replace />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signin' element={<LoginPage />} />
            <Route path='/verify' element={<VerifyPage />} />
            <Route path='/forgot-password' element={<Forget_Password_Page />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App