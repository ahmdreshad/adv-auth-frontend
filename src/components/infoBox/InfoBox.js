import './infoBox.css'

const InfoBox = ({ icon, count, bgColor, title }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <div>
        <span className='info-icon'>{icon} </span>
      </div>
      <div>
        <span className='info-text'>
          <p>{title} </p>
          <h4>{count}</h4>
        </span>
      </div>
    </div>
  )
}
export default InfoBox
