import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { reset, verifyUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import './verify.css'

const Verify = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { verificationToken } = useParams()
  
  const { isLoading } = useSelector((state) => state.auth)

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken))
    await dispatch(reset())
    setTimeout(() => {
      navigate('/profile')
    }, 3000);
  }

  return (
    <div className='verify'>
      {isLoading && <Loader />}
      <h1>Account Verification</h1>
      <p>To verify your account, click the button below</p>
      <button className='verify-btn' onClick={verifyAccount}>
        Verify Account
      </button>
    </div>
  )
}
export default Verify
