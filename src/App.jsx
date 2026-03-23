import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import SobrePage from './pages/SobrePage'
import ComoFuncionaPage from './pages/ComoFuncionaPage'
import EditaisPage from './pages/EditaisPage'
import IndicadoresPage from './pages/IndicadoresPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/como-funciona" element={<ComoFuncionaPage />} />
        <Route path="/editais" element={<EditaisPage />} />
        <Route path="/indicadores" element={<IndicadoresPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
