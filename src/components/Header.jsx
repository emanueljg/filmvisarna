import { Link } from "react-router-dom"
import Navbar from './Navbar';

export default function Home() {

  return <>
    <Link to="/">
      <div className='footer-logo'>
        <a id='footer-logo'><i className='fa-solid fa-film'></i> IRONBOY FILMS</a>
      </div>
    </Link>
    <Navbar />
  </>
}

