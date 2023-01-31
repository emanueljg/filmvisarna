import { useStates } from './utilities/states';
import { Link } from 'react-router-dom';


export default function Home() {

  // Connect to the main state so we can read the movies
  // (that have been fetched an put in the state in the App component)
  const s = useStates('main');

  return <>
    <div className="featuredMovieOverlay"></div>
    <div className="wrapper-featuredMovie">
      <img src="/images/batman_background.jpg" alt="2" />
    </div>
    
    <div className="wrapper-featuredMovieCTA"><img src="
    /images/the-batman.jpg" alt="bat" />
      <div className="wrapper-featuredMovieInfo">
        <p>The Batman (2022)</p>
        <p>176 min</p>
        <button>Biljetter</button>
      </div>
    </div>

    <div className="wrapper-topplistan">
    <h2 className="topplistan">Topplistan</h2>
    <div className="topMovies">
    {s.movies.map(({ path, images, title, length }) =>
      <Link to={path} className="movie">
        <img src={'/images/' + images[0]} />
        <p className="movieTitleFrontPage">{title}</p>
        <p className="movieLength">{length} min</p>
      </Link>
      )}
      </div>
    </div>

    <div className="wrapper-comingSoon">
      <h2 className="title-comingSoon">Kommer snart</h2>
      <div className="comingSoon">
      {s.movies.map(({ path, images, title, length }) =>
        <Link to={path} className="movie">
          <img src={'/images/' + images[0]} />
          <p className="movieTitleFrontPage">{title}</p>
          <p className="movieLength">{length} min</p>
        </Link>
      )}
    </div>
    </div>

  </>;
}