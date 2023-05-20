import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaUnlockAlt } from 'react-icons/fa'
import './loginWithCode.css'
import { toast } from 'react-toastify'
import { loginWithCode, reset, sendLoginCode } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'


const ForgotPassword = () => {
  const { email } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  )

  const [loginCode, setLoginCode] = useState('')


  // resend login code handler
   const sendUserLoginCode = async () => {
     await dispatch(sendLoginCode(email))
     await dispatch(reset())
   }

  // login user with code handler
  const loginUserWithCode = async (e) => {
    e.preventDefault()

    if (loginCode === '') {
      return toast.error('Please enter the 6 digit code', {
        autoClose: 2500,
        position: 'top-center',
      })
    }
    if (loginCode.length !== 6) {
      return toast.error('Login code must be 6 characters', {
        autoClose: 2500,
        position: 'top-center',
      })
    }

    const code = {
      loginCode,
    }

    await dispatch(loginWithCode({ code, email }))
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/profile')
    }
    dispatch(reset())
  }, [isLoggedIn, isSuccess, dispatch, navigate, email])



 
  return (
    <div className='code-container'>
      {isLoading && <Loader />}
      <div className='code-card'>
        <div className='code'>
          <FaUnlockAlt size={35} color='#888' />
          <h2>Enter Access Code</h2>

          <form onSubmit={loginUserWithCode} className='code-form form'>
            <div>
              <input
                type='text'
                placeholder='Enter the access code'
                name='loginCode'
                value={loginCode}
                required
                onChange={(e) => setLoginCode(e.target.value)}
              />
            </div>

            <div>
              <button className='submit-btn'>Procees to login</button>
            </div>
            <p>Check your email for access code</p>
          </form>
          <div className='links'>
            <Link to='/'>Home Page</Link>
            <p onClick={sendUserLoginCode} className='resend-link'>
              Resend Code
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
