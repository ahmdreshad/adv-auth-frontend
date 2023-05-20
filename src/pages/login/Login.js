import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { validateEmail } from '../../redux/features/auth/authService'

import './login.css'
import {
  login,
  loginWithGoogle,
  reset,
  sendLoginCode,
} from '../../redux/features/auth/authSlice'
import { GoogleLogin } from '@react-oauth/google'

const intialState = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(intialState)
  const { email, password } = formData

  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state) => state.auth
  )

  // login user form
  const loginUser = async (e) => {
    e.preventDefault()

    // validation
    if (!password || !email) {
      return toast.error('All fields are required', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    const userData = {
      email,
      password,
    }

    await dispatch(login(userData))
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile')
    }

    // checking for 2 factor athentication
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email))
      navigate(`/login-with-code/${email}`)
    }

    dispatch(reset())
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email])

  // input fields
  const inputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // login with google auth
  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse)
     await dispatch(
       loginWithGoogle({ userToken: credentialResponse.credential })
     )
  }

  return (
    <div className='login-container'>
      {isLoading && <Loader />}
      <div className='login-card'>
        <div className='login'>
          <BiLogIn size={35} color='#888' />
          <h2>Login</h2>
          {/* <button className='google-btn'>
            <img src={GoogleLogo} alt='google' />
            Login with Google
          </button> */}
          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => {
              console.log('Login Failed')
              toast.error('Login Failed')
            }}
          />
          <p>Or</p>
          <form onSubmit={loginUser} className='form login-form'>
            <div>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                required
                onChange={inputChange}
              />
            </div>
            <div>
              <PasswordInput
                placeholder='Password'
                name='password'
                value={password}
                onChange={inputChange}
                required
              />
            </div>
            <div>
              <button className='submit-btn'>Login</button>
            </div>
          </form>
          <p className='login-info'>
            Dont have an account ?<Link to='/register'>Register</Link>
          </p>
          <div className='links'>
            <Link to='/'>Home Page</Link>
            <Link to='/forgot-password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
