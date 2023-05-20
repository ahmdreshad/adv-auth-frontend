import { BiSearch } from 'react-icons/bi'
import './search.css'
const Search = ({ value, onChange }) => {
  return (
    <div className='search-fuck-you'>
      <BiSearch size={25} className='icon-fuck' />
      <input
        className='search-fuck'
        type='text'
        placeholder='Serach User'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
export default Search
