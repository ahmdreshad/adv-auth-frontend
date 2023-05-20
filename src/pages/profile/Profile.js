import { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageMenu from '../../components/pageMenu/PageMenu'
import Card from '../../components/card/Card'
import './profile.css'
import useRedirectLoggedoutUser from '../../customHook/useRedirectLoggedoutUser'
import { getUser, selectUser, updateUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import Notification from '../../components/notification/Notification'


// cloudinary name and upload presets
const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET


// display 5 characters of user name by this function
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat('...')
    return shortenedText
  }
  return text
}


const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useRedirectLoggedoutUser('/')

  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    photo: user?.photo || '',
    bio: user?.bio || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
  }
  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  // image file
  const handleImgChange = (e) => {
    setProfileImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  // input fields
  const handleInputs = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  // save profile form
  const saveProfileForm = async (e) => {
    e.preventDefault()

    let imageURL

    try {
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData()
        image.append('file', profileImage)
        image.append('cloud_name', cloud_name)
        image.append('upload_preset', upload_preset)

        // save image to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dkk1ogwgv/image/upload',
          {
            method: 'POST',
            body: image,
          }
        )
        const imgData = await response.json()
        console.log(imgData)
        imageURL = imgData.url.toString()
      }

      // save profile to Mongo DB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      }
      dispatch(updateUser(userData))
    } catch (error) {
      toast.error(error.message)
    }
  }
  useLayoutEffect(() => {

    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      })
    }

  },[user])

  return (
    <>
      {isLoading && <Loader />}
      {!profile.isVerified && <Notification />}
      <PageMenu />
      <h1 className='profile-heading'>Profile</h1>
      <div className='profile'>
        <Card cardClass={'profile-card'}>
          {!isLoading && user && (
            <>
              <div className='profile-photo'>
                <img
                  src={imagePreview === null ? user?.photo : imagePreview}
                  alt='profileImg'
                />
                <h3>Role: {user?.role} </h3>
              </div>
              <form onSubmit={saveProfileForm} className='profile-form form'>
                <div>
                  <label>Change Photo:</label>
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={handleImgChange}
                  />
                </div>
                <div>
                  <label>Name:</label>
                  <input
                    type='text'
                    name='name'
                    value={profile?.name}
                    onChange={handleInputs}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={profile?.email}
                    onChange={handleInputs}
                    disabled
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type='text'
                    name='phone'
                    value={profile?.phone}
                    onChange={handleInputs}
                  />
                </div>
                <div>
                  <label>Bio:</label>
                  <textarea
                    name='bio'
                    value={profile?.bio}
                    cols='52'
                    rows='8'
                    onChange={handleInputs}
                  ></textarea>
                </div>
                <button className='profile-btn'>Update Profile</button>
              </form>
            </>
          )}
        </Card>
      </div>
    </>
  )
}


export const UserName = () => {
  const user = useSelector(selectUser)

  const username = user?.name || '...'
  return <p>Hi, {shortenText(username, 6)} | </p>
}
export default Profile
