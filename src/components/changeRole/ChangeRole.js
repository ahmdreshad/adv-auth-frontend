import { useState } from 'react'
import './changeRole.css'
import { FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice'
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice'
import { emailReset } from '../../redux/features/email/emailSlice'

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState('')
  const dispatch = useDispatch()

  // change user role handler //
  const changeRoleHandler = async (e) => {
    e.preventDefault()

    if (!userRole) {
      return toast.error('Please select a role ', {
        autoClose: 2500,
        position: 'top-center'
     })
    }

    const userData = {
      role: userRole,
      id: _id,
    }

    const emailData = {
      subject: 'Account role has been changed',
      send_to: email,
      reply_to: 'noreply@mrreact.com',
      template: 'changeRole',
      url: '/login',
    }

    await dispatch(sendAutomatedEmail(emailData))
    await dispatch(upgradeUser(userData))
    await dispatch(getUsers())
    dispatch(emailReset())
  }

  return (
    <form className='change-role'>
      <select
        className='select'
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
      >
        <option value='select'>select</option>
        <option value='subscriber'>Subscriber</option>
        <option value='author'>Author</option>
        <option value='admin'>Admin</option>
        <option value='suspended'>Suspended</option>
      </select>
      <button
        onClick={(e) => changeRoleHandler(e, _id, userRole)}
        className='check-btn'
        type='button'
      >
        <FaCheck size={18} />
      </button>
    </form>
  )
}
export default ChangeRole
