import './footer.css'



const Footer = () => {
    const date = new Date()
    const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  return (
      <footer className="footer">
          <p>copyright &copy; MrReact {today} </p>

    </footer>
  )
}
export default Footer