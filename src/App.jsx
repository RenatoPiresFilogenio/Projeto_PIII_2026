import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import PublicLayout from './components/PublicLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AuthenticatedLayout from './components/AuthenticatedLayout'
import HomePage from './pages/HomePage'
import SobrePage from './pages/SobrePage'
import ComoFuncionaPage from './pages/ComoFuncionaPage'
import IndicadoresPage from './pages/IndicadoresPage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import PublishChallengePage from './pages/PublishChallengePage'

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/indicadores" element={<IndicadoresPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/pesquisa" element={<SearchPage />} />
            <Route path="/app/indicadores" element={<IndicadoresPage />} />
            <Route path="/perfil" element={<ProfilePage />} />

            <Route element={<ProtectedRoute requiredType="empresa" />}>
              <Route path="/desafios/novo" element={<PublishChallengePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
