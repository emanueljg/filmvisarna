import { Link } from "react-router-dom"
import Navbar from './Navbar';

export default function Home() {

  return <nav>
    <Link to="/">
      <div className='header-logo'>
        <i className='fa-solid fa-film'></i> IRONBOY FILMS</div>
    </Link>
    <Navbar />
  </nav>
}

