import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa'
import PageMenu from '../../components/pageMenu/PageMenu'
import UserStats from '../../components/userStats/UserStats'
import Search from '../../components/search/Search'
import ChangeRole from '../../components/changeRole/ChangeRole'
import useRedirectLoggedoutUser from '../../customHook/useRedirectLoggedoutUser'
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice'
import { shortenText } from '../profile/Profile'
import Loader from '../../components/loader/Loader'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './userList.css'
import { filterUsers, selectUsers } from '../../redux/features/filter/filterSlice'
import ReactPaginate from 'react-paginate'

const UserList = () => {
  useRedirectLoggedoutUser('/login')

  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const { users, isLoading } = useSelector(
    (state) => state.auth
  )
  const filteredUsers = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  // deleting users
  const removeUser = async (id) => {
    await dispatch(deleteUser(id))
    dispatch(getUsers())
  }

  // delete notification popup 
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure ?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeUser(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    })
  }

  useEffect(() => {
    dispatch(filterUsers({users, search}))
  }, [dispatch, users, search])



  /* Pagination starts */

   const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 3
   const endOffset = itemOffset + itemsPerPage
   const currentItems = filteredUsers.slice(itemOffset, endOffset)
   const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)

 
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % filteredUsers.length
    
     setItemOffset(newOffset)
   }
  /* Pagination ends */
  return (
    <section>
      <div className='container'>
        <PageMenu />
        <UserStats />

        <div className='user-list'>
          {isLoading && <Loader />}
          <div className='search-bar'>
            <span>
              <h3>All Users</h3>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
          {/* Table */}
          {!isLoading && users.length === 0 ? (
            <p>No user found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { _id, name, email, role } = user
                  return (
                    <tr key={_id}>
                      <td>{index + 1} </td>
                      <td>{shortenText(name, 8)} </td>
                      <td>{email} </td>
                      <td>{role} </td>
                      <td>
                        <ChangeRole _id={_id} email={email} />
                      </td>
                      <td>
                        <span>
                          <FaTrashAlt
                            className='delete-user-btn'
                            size={20}
                            color='red'
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='Prev'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num btns'
          nextLinkClassName='page-num btns'
          activeLinkClassName='activePage'
        />
      </div>
    </section>
  )
}
export default UserList
