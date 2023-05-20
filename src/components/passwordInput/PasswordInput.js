import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './passwordInput.css'

const PasswordInput = ({ placeholder, value, name, onChange, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordd = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='password'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
        />
      <div className='icon' onClick={togglePasswordd}>
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </div>
    </div>
  )
}
export default PasswordInput
