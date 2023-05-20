import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authService from './authService'

const initialState = {
  user: null,
  users: [],
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  twoFactor: false,
  message: '',
  verifiedUsers: 0,
  suspendedUsers: 0,
}

// all auth functions
// register ///////////////////////
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Login user ///////////////////////
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Logout user ///////////////////////
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get login status ///////////////////////
export const getLoginStatus = createAsyncThunk(
  'auth/getLoginStatus',
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User ///////////////////////
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    return await authService.getUser()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update User ///////////////////////
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// send Verification Email ///////////////////////
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (_, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Verify User ///////////////////////
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.verifyUser(verificationToken)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// change Password ///////////////////////
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Forgot Password ///////////////////////
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.forgotPassword(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Reset Password ///////////////////////
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      return await authService.resetPassword(userData, resetToken)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get Users ///////////////////////
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      return await authService.getUsers()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Delete Users ///////////////////////
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, thunkAPI) => {
    try {
      return await authService.deleteUser(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// upgrade User ////////////////////
export const upgradeUser = createAsyncThunk(
  'auth/upgradeUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.upgradeUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// sendLoginCode ////////////////////
export const sendLoginCode = createAsyncThunk(
  'auth/sendLoginCode ',
  async (email, thunkAPI) => {
    try {
      return await authService.sendLoginCode(email)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// loginWithCode ////////////////////
export const loginWithCode = createAsyncThunk(
  'auth/loginWithCode ',
  async ({ code, email }, thunkAPI) => {
    try {
      return await authService.loginWithCode(code, email)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// login with google /////
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (userToekn, thunkAPI) => {
    try {
      return await authService.loginWithGoogle(userToekn)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset(state) {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.twoFactor = false
      state.message = ''
    },
    calc_verifiedUsers(state, action) {
      const array = []
      state.users.map((user) => {
        const { isVerified } = user
        return array.push(isVerified)
      })
      let count = 0
      array.forEach((item) => {
        if (item === true) {
          count += 1
        }
      })
      state.verifiedUsers = count
    },
    calc_suspendedUsers(state, action) {
      let array = []
      state.users.map((user) => {
        const { role } = user
        return array.push(role)
      })

      let count = 0
      array.forEach((item) => {
        if (item === 'suspended') {
          count += 1
        }
      })
      state.suspendedUsers = count
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user //
      .addCase(register.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        console.log(action.payload)
        toast.success('Registration successful', {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // Login user //
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        console.log(action.payload)
        toast.success('Logged in successfully', {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
        if (action.payload.includes('New browser')) {
          state.twoFactor = true
        }
      })
      // Logout user //
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = false
        state.user = null
        console.log(action.payload)
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // login status //
      .addCase(getLoginStatus.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = action.payload
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get User //
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // Update User //
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        toast.success('User updated', {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // send Verification Email //
      .addCase(sendVerificationEmail.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // Verify User //
      .addCase(verifyUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // Change Password //
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      // Forgot Password //
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // Reset Password //
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // get Users //
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // Delete User //
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // Upgrade User //
      .addCase(upgradeUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(upgradeUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // sendLoginCode //
      .addCase(sendLoginCode.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // loginWithCode //
      .addCase(loginWithCode.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.twoFactor = false
        state.user = action.payload
        toast.success(action.payload, {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
      // loginWithGoogle //
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload
        toast.success('Login Successful', {
          autoClose: 2500,
          position: 'top-center',
        })
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload, {
          autoClose: 3500,
          position: 'top-center',
        })
      })
  },
})

export const { reset, calc_verifiedUsers, calc_suspendedUsers } =
  authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user

export default authSlice.reducer
