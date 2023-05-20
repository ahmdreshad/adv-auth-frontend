import { Link } from 'react-router-dom'
import HomeImg from '../../assets/register.png'
import './home.css'
const Home = () => {
  return (
    <main className='main'>
      <div className='homePage'>
        <div className='info'>
          <h1>Ultimate MERN stack authentication</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            iusto possimus quisquam distinctio cum quibusdam. adipisicing elit.
            Magnam iusto possimus quisquam distinctio cum quibusdam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            iusto possimus quisquam distinctio cum quibusdam.
          </p>

          <span>
            <Link to='/register'>
              <button>Register</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </span>
        </div>
        <div className='image'>
          <img src={HomeImg} alt='someimg' />
        </div>
      </div>
    </main>
  )
}
export default Home
