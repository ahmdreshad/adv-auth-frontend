import InfoBox from '../infoBox/InfoBox'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'
import './userStats.css'
import { useEffect } from 'react'
import { calc_suspendedUsers, calc_verifiedUsers, reset } from '../../redux/features/auth/authSlice'

// icons
const icon1 = <FaUser color='#fff' size={35} />
const icon2 = <BiUserCheck color='#fff' size={40} />
const icon3 = <BiUserMinus color='#fff' size={40} />
const icon4 = <BiUserX color='#fff' size={40} />

const UserStats = () => {
  const dispatch = useDispatch()
  const {users, verifiedUsers, suspendedUsers} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(calc_verifiedUsers())
    dispatch(calc_suspendedUsers())
    dispatch(reset())
  },[dispatch, users])


  const unverifiedUsers = users.length - verifiedUsers

  return (
    <div className='user-summary'>
      <h1>User Stats</h1>
      <div className='user-stats'>
        <InfoBox
          icon={icon1}
          title={'Total Users'}
          count={users.length}
          bgColor={'card1'}
        />
        <InfoBox
          icon={icon2}
          title={'Verified Users'}
          count={verifiedUsers}
          bgColor={'card2'}
        />
        <InfoBox
          icon={icon3}
          title={'Unverified Users'}
          count={unverifiedUsers}
          bgColor={'card3'}
        />
        <InfoBox
          icon={icon4}
          title={'Suspended Users'}
          count={suspendedUsers}
          bgColor={'card4'}
        />
      </div>
    </div>
  )
}
export default UserStats
