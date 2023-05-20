import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsPersonLock } from 'react-icons/bs'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import './resetPassword.css'
import { toast } from 'react-toastify'
import { reset, resetPassword } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const intialState = {
  password: '',
  password2: '',
}
const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { resetToken } = useParams()

  const { isLoading, isSuccess, message } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState(intialState)
  const { password, password2 } = formData

  console.log(resetToken);

  // form
  const resetPasswordForm = async (e) => {
    e.preventDefault()

    // validation

    if (!password || !password2) {
      return toast.error('Please enter your new password', {
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

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    const userData = {
      password,
    }

    await dispatch(resetPassword({userData, resetToken}))
  }

  useEffect(() => {
    if (isSuccess && message.includes('reset successful')) {
      navigate('/login')
    }

    dispatch(reset())
  }, [message, isSuccess, dispatch, navigate])

  // inputs
  const inputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='reset-container'>
      {isLoading && <Loader />}
      <div className='reset-card'>
        <div className='login'>
          <BsPersonLock size={40} color='#888' />
          <h2>Reset Password</h2>
          <form onSubmit={resetPasswordForm} className='reset-form form'>
            <div>
              <PasswordInput
                placeholder='New Password'
                name='password'
                value={password}
                onChange={inputChange}
              />
            </div>
            <div>
              <PasswordInput
                placeholder='Confirm New Password'
                name='password2'
                value={password2}
                onChange={inputChange}
              />
            </div>
            <div>
              <button className='submit-btn'>Reset Password</button>
            </div>
          </form>

          <div className='links'>
            <Link to='/'>Home Page</Link>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
