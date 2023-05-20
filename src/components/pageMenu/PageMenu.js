import { NavLink } from 'react-router-dom'
import { AdminAuthorLink } from '../protect/HiddenLink'
import './pageMenu.css'

const PageMenu = () => {
  return (
    <div className='page-menu'>
      <nav className='nav-menu'>
        <ul>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/change-password'>Change Password</NavLink>
          </li>
          <AdminAuthorLink>
            <li>
              <NavLink to='/users'>Users</NavLink>
            </li>
          </AdminAuthorLink>
        </ul>
      </nav>
    </div>
  )
}
export default PageMenu
