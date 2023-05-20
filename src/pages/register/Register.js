import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TiUserAddOutline } from 'react-icons/ti'
import { HiHome } from 'react-icons/hi'
import { FaTimes, FaCheck } from 'react-icons/fa'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import './register.css'
import { validateEmail } from '../../redux/features/auth/authService'
import Loader from '../../components/loader/Loader'
import { register, reset, sendVerificationEmail } from '../../redux/features/auth/authSlice'

const intialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
}
const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState(intialState)
  const { name, email, password, password2 } = formData

  // password validation
  const [uppercase, setUppercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [passwordLength, setPasswordLength] = useState(false)

  // Password Strength

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUppercase(true)
    } else {
      setUppercase(false)
    }

    if (password.match(/([0-9])/)) {
      setNumber(true)
    } else {
      setNumber(false)
    }

    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setCharacter(true)
    } else {
      setCharacter(false)
    }
    if (password.length > 6) {
      setPasswordLength(true)
    } else {
      setPasswordLength(false)
    }
  }, [password])

  // password strength
  const checkIcon = <FaCheck color='green' size={15} />
  const timesIcon = <FaTimes color='red' size={15} />

  // Register user form
  const RegisterUser = async(e) => {
    e.preventDefault()

    // validation
    if (!name || !password || !email) {
      return toast.error('All fields are required', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    if (password !== password2) {
      return toast.error('Passwords do not match', {
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
      name, email, password
    }

    await dispatch(register(userData))
    await dispatch(sendVerificationEmail())

  }


  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile')
    }

    dispatch(reset())
  }, [isLoggedIn, isSuccess, dispatch, navigate])

  // input fields  ///
  const inputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // icon based on condition
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon
    }
    return timesIcon
  }

  return (
    <div className='register-container'>
      {isLoading && <Loader />}
      <div className='register-card'>
        <div className='register'>
          <TiUserAddOutline size={40} color='#888' />
          <h2>Register</h2>
          <form onSubmit={RegisterUser} className='form register-form'>
            <div>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={inputChange}
              />
            </div>
            <div>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={inputChange}
              />
            </div>
            <div>
              <PasswordInput
                placeholder='Password'
                name='password'
                value={password}
                onChange={inputChange}
              />
            </div>
            <div>
              <PasswordInput
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={inputChange}
                onPaste={(e) => {
                  e.preventDefault()
                  toast.error('You can not past the password, type it', {
                    autoClose: 2500,
                    position: 'top-center',
                  })
                  return false
                }}
              />
            </div>
            <Card>
              <ul className='form-list'>
                <li>
                  <span className='indicator'>
                    {switchIcon(uppercase)} Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className='indicator'>
                    {switchIcon(number)} Number (0 - 9)
                  </span>
                </li>
                <li>
                  <span className='indicator'>
                    {switchIcon(character)} 1 special character (@ ! # $ % ^ &
                    *)
                  </span>
                </li>
                <li>
                  <span className='indicator'>
                    {switchIcon(passwordLength)} at least 6 characters
                  </span>
                </li>
              </ul>
            </Card>
            <div>
              <button className='submit-btn'>Register</button>
            </div>
          </form>

          <p className='login-info'>
            Already have an account ?<Link to='/login'>Login</Link>
          </p>
          <div>
            <Link to='/' className='register-link'>
              Home Page <HiHome size={25} />{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
