import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../redux/features/auth/authSlice'
import './header.css'
import { ShowOnLogin, ShowOnLogout } from './protect/HiddenLink'
import { UserName } from '../pages/profile/Profile'

const activeLink = ({ isActive }) => (isActive ? 'active' : 'normal')
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = async (e) => {
    dispatch(reset())

    await dispatch(logout())
    navigate('/')
  }
  return (
    <header className='header'>
      <nav className='nav'>
        <div className='logo'>
          <Link to='/'>
            <BiLogIn size={35} />
            <span>MrReact</span>
          </Link>
        </div>
        <ul>
          <ShowOnLogin>
            <li className='user'>
              <FaUserCircle size={20} />
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className='btn'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to='/profile' className={activeLink}>
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={logoutUser} className='btn logout'>
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  )
}
export default Header
