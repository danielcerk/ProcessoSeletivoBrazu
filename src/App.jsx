import './App.css'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'

import Navbar from './layout/Navbar/Navbar'
import Footer from './layout/Footer/Footer'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path='' element={<Home />} />
        <Route path='dashboard/' element={<Dashboard />} />

      </Routes>

      <Footer />

    </Router>
  )
}

export default App
