import { useDispatch } from 'react-redux'
import './notification.css'
import { reset, sendVerificationEmail } from '../../redux/features/auth/authSlice'

const Notification = () => {
    const dispatch = useDispatch()


    const sendVEmail = async () => {
        await dispatch(sendVerificationEmail())
        await dispatch(reset())
     }
    
  return (
    <div className='verification-container'>
      <div className='alert'>
        <p>
          <b>Message: </b> &nbsp;
        </p>
        <p>Your account is not yet verified, To verify your account, Click the Resend link</p>{' '}
        &nbsp;
        <button className='v-link' onClick={sendVEmail}>
          <b>Resend Link</b>
        </button>
      </div>
    </div>
  )
}
export default Notification
