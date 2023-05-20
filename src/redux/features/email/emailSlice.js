import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import emailService from './emailService'

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: '',
}


// send Automated Email ///////////////////////
export const sendAutomatedEmail = createAsyncThunk(
  'auth/sendAutomatedEmail',
  async (emailData, thunkAPI) => {
    try {
      return await emailService.sendAutomatedEmail(emailData)
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

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    emailReset(state) {
      state.sendingEmail = false
      state.emailSent = false
      state.msg = ''
    },
    },
    extraReducers: (builder) => {
        builder.addCase(sendAutomatedEmail.pending, (state, action) => {
          state.sendingEmail = true
        }).addCase(sendAutomatedEmail.fulfilled, (state, action) => {
            state.sendingEmail = false
            state.emailSent = true
            state.msg = action.payload
             toast.success(action.payload, {
               position: 'top-center',
             })
        }).addCase(sendAutomatedEmail.rejected, (state, action) => {
            state.sendingEmail = false
            state.emailSent = false
            state.msg = action.payload
            toast.success(action.payload, {
              position: 'top-center',
            })
      })
  }
})

export const {emailReset} = emailSlice.actions

export default emailSlice.reducer
