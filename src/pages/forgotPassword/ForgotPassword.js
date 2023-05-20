import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { validateEmail } from '../../redux/features/auth/authService'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, reset } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import './forgotPassword.css'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { isLoading } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')

  const forgotPasswordhandler = async (e) => {
    e.preventDefault()

    // validation
    if (!email) {
      return toast.error('Please enter your email', {
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
    }

    await dispatch(forgotPassword(userData))
    await dispatch(reset())
  }

  return (
    <div className='forgot-container'>
      {isLoading && <Loader />}
      <div className='forgot-card'>
        <div className='forgot'>
          <AiOutlineMail size={35} color='#888' />
          <h2>Forgot Password</h2>

          <form onSubmit={forgotPasswordhandler} className='form'>
            <div>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button className='submit-btn'>Get Reset Email</button>
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
export default ForgotPassword
