import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/users/`

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

// Register user ////////////////////
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)
  return response.data
}
// Login user ////////////////////////
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  return response.data
}
// Logout user ////////////////////////
const logout = async () => {
  const response = await axios.get(API_URL + 'logout')
  return response.data.message
}
// Get Login status ////////////////////////
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + 'login-status')
  return response.data
}

// Get User   ////////////////////////
const getUser = async () => {
  const response = await axios.get(API_URL + 'get-user')
  return response.data
}

// Update User   ////////////////////////
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + 'update-user', userData)
  return response.data
}
// Send verification email   ////////////////////////
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + 'send-verification-email')
  return response.data.message
}

// Verify User  ////////////////////////
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}/verify-user/${verificationToken}`
  )
  return response.data.message
}
// Change Password  ////////////////////////
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + 'change-password', userData)
  return response.data.message
}
// Forgot Password  ////////////////////////
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + 'forgot-password', userData)
  return response.data.message
}
// Reset Password  ////////////////////////
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}/reset-Password/${resetToken}`,
    userData
  )
  return response.data.message
}
// Get Users ////////////////////////
const getUsers = async () => {
  const response = await axios.get(API_URL + 'get-users')
  return response.data
}
// Delete User ////////////////////////
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id)
  return response.data.message
}
// Upgrade User ////////////////////////
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + 'upgrade-user', userData)
  return response.data.message
}
// Send Login Code ////////////////////////
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `send-login-code/${email}`)
  return response.data.message
}
// Login With Code ////////////////////////
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `login-with-code/${email}`, code)
  return response.data
}

// login with google /////////////////////
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + 'google/callback', userToken)
  return response.data
}

// exports
const authService = {
  login,
  logout,
  getUser,
  register,
  updateUser,
  verifyUser,
  resetPassword,
  getLoginStatus,
  changePassword,
  forgotPassword,
  sendVerificationEmail,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
}

export default authService
