import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import authService from '../redux/features/auth/authService'
import { toast } from 'react-toastify'

const useRedirectLoggedoutUser = (path) => {
  const navigate = useNavigate()

  useEffect(() => {
    let isLoggedIn

    const redirectLoggedoutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus()
      } catch (error) {
        console.log(error.message)
      }
      if (!isLoggedIn) {
        toast.info('Session has expired, Please login to continue', {
          autoClose: 2500,
          position: 'top-center',
        })
        navigate(path)
        return
      }
    }
    redirectLoggedoutUser()
  }, [navigate, path])
}
export default useRedirectLoggedoutUser
