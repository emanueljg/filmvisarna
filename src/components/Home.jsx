import { useStates } from '../utilities/states';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Home() {

  // Connect to the main state so we can read the movies
  // (that have been fetched an put in the state in the App component)
  const s = useStates('main');
  const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2048 },
    items: 5
    },
    biggerDesktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

  return <>
 
    <div className="featuredMovie"> <img src="/images/batman_background.jpg" alt="bat" />      
      <div className="gradientFeaturedMovie"> </div>
    </div>
    <div className="featuredMovieCTA-container">
      <div className="featuredMovieCTA-image">
        <a href="/movie/the-batman" style={{textDecoration: 'none'}}>
        <img src="/images/batman-CTA.png" alt="batat" />
          <h1> The Batman (2022)</h1>
          <span className='feature-movie-span'>176min</span>
          <span className='feature-movie-span-rating'>PG-13</span>
        </a>
      </div>
    </div>

    <div className="body-movies">
      <div className="showingNow">
        <h1>På bio nu!</h1>
        <Carousel responsive={responsive}>
          {s.movies.map(({ path, images, title, length, rated }) =>
        <Link to={path} className="movie">
          <img className='movie-image' src={'/images/' + images[0]} />
          <h2>{title}</h2>
          <p className='length'>{length}</p>
          <p className='rating'>{rated}</p>
          <p>
            <button>Mer info</button>
          </p>
        </Link>
          )}
          
        </Carousel>;




      
      </div>
    </div>
  </>;
}