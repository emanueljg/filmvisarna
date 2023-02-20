import { useStates } from "../utilities/states";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import YouTube from "react-youtube";
import SlideShow from "./SlideShow";

export default function Home() {
  // Connect to the main state so we can read the movies
  // (that have been fetched an put in the state in the App component)
  const s = useStates("main");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2048 },
      items: 5,
    },
    biggerDesktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const opts = {
    playerVars: {
      autoPlay: 0,
    },
  };

  return <>

    <div className="featuredMovie"> <img src="/images/batman_background.jpg" alt="bat" />
      <div className="gradientFeaturedMovie"> </div>
    </div>
    <div className="featuredMovieCTA-container">
      <div className="featuredMovieCTA-image">
        <a href="/movie/the-batman" style={{ textDecoration: 'none' }}>
          <img src="/images/batman-CTA.png" alt="batat" />
          <h1> The Batman (2022)</h1>
        </a>
      </div>

    <div className="body-movies">
      <div className="showingNow">
        <h1>På bio nu!</h1>
        {s.movies.map(({ path, images, title, length }) =>
          <Link to={path} className="movie">
            <img src={'/images/' + images[0]} />
            <h3>{title}</h3>
          </Link>
        )}
      </div>
    </div>
    <div className="comingSoon">
      <h1>Kommande</h1>
      {s.movies.slice(6).map(({ path, images, title, length }) =>
        <Link to={path} className="movie">
          <img src={'/images/' + images[0]} />
          <h3>{title}</h3>
          <h4>{length}</h4>
        </Link>
      )}
    </div>
  </>;
}
