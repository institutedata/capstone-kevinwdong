
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Grid } from '@mui/material'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import GamePage from '../pages/GamePage'
import BlogPage from '../pages/BlogPage'
import UserPage from '../pages/UserPage'


const AppRoutes = (props) => {
  return (
    <Grid container height='100vh' backgroundColor="lightblue">
      <Routes>
        <Route index element={<LandingPage {...props} />} />
        <Route path='/home' element={<HomePage {...props} />} />
        <Route path='/login' element={<LoginPage {...props} />} />
        <Route path='/register' element={<RegisterPage {...props} />} />
        <Route path='/game' element={<GamePage {...props} />} />
        <Route path='/blog' element={<BlogPage {...props} />} />
        <Route path='/user' element={<UserPage {...props} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Grid>
  )
}

export default AppRoutes
