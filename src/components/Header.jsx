import { Link } from "react-router-dom"
import Navbar from './Navbar';

export default function Home() {

  return <nav>
    <Link to="/">
      <a className='header-logo'>
        <i className='fa-solid fa-film'></i> IRONBOY FILMS</a>
    </Link>
    <Navbar />
  </nav>
}

