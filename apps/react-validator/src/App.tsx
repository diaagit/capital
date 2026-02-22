import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import VerifyPage from './pages/VerifyPage'
import Forget_Password_Page from './pages/Forget_Password'
import ProtectedRoute from './components/auth/ProtectedRoute'
import EventPage from './pages/Events'
import ScannerPage from './pages/Scanner'
import NotFoundPage from './pages/NotFoundPage'
import Personal_Info_Page from './pages/Personal_Info_Page'

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
                <Route index element={<ScannerPage />} />
                <Route path="events" element={<EventPage />} />
                <Route path="profile" element={<Personal_Info_Page />} />
                {/* <Route path="wallet" element={<Wallet />} /> */}
                {/* <Route path="settings" element={<Settings />} /> */}
              </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App