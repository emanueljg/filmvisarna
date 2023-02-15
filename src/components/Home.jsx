import { useStates } from '../utilities/states';
import { Link } from 'react-router-dom';


export default function Home() {

  // Connect to the main state so we can read the movies
  // (that have been fetched an put in the state in the App component)
  const s = useStates('main');

  return <>
 
    <div className="featuredMovie"> <img src="/images/batman_background.jpg" alt="bat" />      
      <div className="gradientFeaturedMovie"> </div>
    </div>
    <div className="featuredMovieCTA-container">
      <div className="featuredMovieCTA-image">
        <a href="/movie/the-batman" style={{textDecoration: 'none'}}>
        <img src="/images/batman-CTA.png" alt="batat" />
        <h1> The Batman (2022)</h1>
        </a>
      </div>
    </div>

    <div className="body-movies">
      <div className="showingNow">
      <h1>På bio nu!</h1>
      {s.movies.slice(0,7).map(({ path, images, title, length, rated }) =>
        <Link to={path} className="movie">
          <img src={'/images/' + images[0]} />
          <h2>{title}</h2>
          <p>{length}</p>
          <p className='rating'>{rated}</p>
        </Link>
        )}
      </div>
    </div>
  </>;
}