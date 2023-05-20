import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Layout from './components/layout/Layout'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'
import LoginWithCode from './pages/loginWithCode/LoginWithCode'
import Verify from './pages/verify/Verify'
import Profile from './pages/profile/Profile'
import ChangePassword from './pages/changePassword/ChangePassword'
import UserList from './pages/userList/UserList'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from './redux/features/auth/authSlice'
import NotFound from './pages/nofFound/NotFound'

import { GoogleOAuthProvider } from '@react-oauth/google'

axios.defaults.withCredentials = true

const App = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getLoginStatus())

    if (isLoggedIn && user === null) {
      dispatch(getUser())
    }
  }, [dispatch, isLoggedIn, user])

  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <Routes>
              <Route
                path='/'
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/*' element={<NotFound />} />
              <Route
                path='/reset-password/:resetToken'
                element={<ResetPassword />}
              />
              <Route
                path='/login-with-code/:email'
                element={<LoginWithCode />}
              />

              <Route
                path='/verify/:verificationToken'
                element={
                  <Layout>
                    <Verify />
                  </Layout>
                }
              />
              <Route
                path='/profile'
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path='/change-password'
                element={
                  <Layout>
                    <ChangePassword />
                  </Layout>
                }
              />
              <Route
                path='/users'
                element={
                  <Layout>
                    <UserList />
                  </Layout>
                }
              />
            </Routes>
          </GoogleOAuthProvider>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
export default App
