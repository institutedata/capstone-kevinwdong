import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'


function App() {

  return (
   
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
  

  
  )
}

export default App
