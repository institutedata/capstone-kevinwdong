
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import LandingPage from '../pages/LandingPage'


const AppRoutes = (props) => {
  return (
    <div>
      <Routes>
        <Route index element={<LandingPage {...props} />} />
        <Route path='/home' element={<HomePage {...props} />} />
        <Route path='/signIn' element={<SignInPage {...props} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
