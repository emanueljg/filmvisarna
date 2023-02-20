import { Link } from "react-router-dom"
import Navbar from './Navbar';

let title = "IRONBOY FILMS";

const titleChange = async () => { 
  const resp = await fetch('/api/header-title');
  title = resp.ok ? await resp.text() : "Flask backend 404'd ;(";
}

// uncomment/comment to turn on/off backend test 
titleChange()


export default function Home() {
  return <nav>
    <Link to="/">
      <a className='header-logo'>
        <i className='fa-solid fa-film'></i>{title}</a>
    </Link>
    <Navbar />
  </nav>
}

