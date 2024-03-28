
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Box } from '@mui/material'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import LandingPage from '../pages/LandingPage'
import GamePage from '../pages/GamePage'
import BlogPage from '../pages/BlogPage'
import UserPage from '../pages/UserPage'


const AppRoutes = (props) => {
  return (
    <Box display='flex' justifyContent='center' >
      <Routes>
        <Route index element={<LandingPage {...props} />} />
        <Route path='/home' element={<HomePage {...props} />} />
        <Route path='/signIn' element={<SignInPage {...props} />} />
        <Route path='/signUp' element={<SignUpPage {...props} />} />
        <Route path='/game' element={<GamePage {...props} />} />
        <Route path='/blog' element={<BlogPage {...props} />} />
        <Route path='/user' element={<UserPage {...props} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Box>
  )
}

export default AppRoutes
