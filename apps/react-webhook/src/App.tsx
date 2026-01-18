import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Bank from './ui/components/Bank'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/bank/:provider/:type/:token/:amount" element={<Bank />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App