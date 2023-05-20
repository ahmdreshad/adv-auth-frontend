import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div>
          <h1 style={{ color: 'red', margin: '5rem auto' }}>Page does not exist</h1>
          <Link to='/'>
      <button style={{ backgroundColor: '#0c6d72', color: '#fff', padding: '1rem', borderRadius: '.5rem', border: 'none', cursor: 'pointer' }}>Home Page</button>
          </Link>
    </div>
  )
}
export default NotFound