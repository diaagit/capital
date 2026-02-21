import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import VerifyPage from './pages/VerifyPage'
import Forget_Password_Page from './pages/Forget_Password'
import ProtectedRoute from './components/auth/ProtectedRoute'
import EventPage from './pages/Events'

function App() {
  //Scanner, Upcoming Events, Logout, Profile, Scanned Tickets
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/signup" replace />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signin' element={<LoginPage />} />
            <Route path='/forgot-password' element={<Forget_Password_Page />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/verify' element={<VerifyPage />} />
              <Route path="/dashboard">
                {/* <Route index element={<Dashboard />} /> */}
                <Route path="events" element={<EventPage />} />
                {/* <Route path="wallet" element={<Wallet />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="settings" element={<Settings />} /> */}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App