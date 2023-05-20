import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageMenu from '../../components/pageMenu/PageMenu'
import Card from '../../components/card/Card'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import useRedirectLoggedoutUser from '../../customHook/useRedirectLoggedoutUser'
import Loader from '../../components/loader/Loader'

import './changePassword.css'
import { toast } from 'react-toastify'
import {
  changePassword,
  logout,
  reset,
} from '../../redux/features/auth/authSlice'
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice'

const initialState = {
  oldPassword: '',
  password: '',
  password2: '',
}

const ChangePassword = () => {
  const { isLoading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useRedirectLoggedoutUser('/')

  const [formData, setFormData] = useState(initialState)

  const { password, password2, oldPassword } = formData

  // input fields
  const handleInputs = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // update password form
  const updatePassword = async (e) => {
    e.preventDefault()

    // password validation
    if (!oldPassword || !password || !password2) {
      return toast.error('Please enter your old password', {
        position: 'top-center',
      })
    }
    if (password !== password2) {
      return toast.error('Passwords do not match', {
        position: 'top-center',
      })
    }

    const userData = {
      oldPassword,
      password,
    }


    const emailData = {
      subject: 'Password Changed',
      send_to: user.email,
      reply_to: 'noreply@mrreact.com',
      template: 'passwordChange',
      url: '/forgot'
    }

    await dispatch(changePassword(userData))
    await dispatch(sendAutomatedEmail(emailData))
    setTimeout(() => {
      dispatch(logout())
      navigate('/login')
      
    }, 4000);
    await dispatch(reset())
  }

  return (
    <>
      {isLoading && <Loader />}
      <PageMenu />
      <h1 className='change-password-heading'>Change Password</h1>
      <div className='change-password-container'>
        <Card cardClass={'change-password-card'}>
          <form onSubmit={updatePassword} className='form change-password-form'>
            <div>
              <label>Current Password</label>
              <PasswordInput
                name='oldPassword'
                value={oldPassword}
                onChange={handleInputs}
              />
            </div>
            <div>
              <label>New Password</label>
              <PasswordInput
                name='password'
                value={password}
                onChange={handleInputs}
              />
            </div>
            <div>
              <label>Confirm New Password</label>
              <PasswordInput
                name='password2'
                value={password2}
                onChange={handleInputs}
              />
            </div>
            <button className='change-password-btn'>Change Password</button>
          </form>
        </Card>
      </div>
    </>
  )
}
export default ChangePassword
