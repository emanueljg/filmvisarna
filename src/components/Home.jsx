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

  const responsiveNews = {
    biggerDesktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
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

  return (
    <>
      <div className="featuredMovie">
        {" "}
        <img src="/images/batman_background.jpg" alt="bat" />
        <div className="gradientFeaturedMovie"> </div>
      </div>
      <div className="featuredMovieCTA-container">
        <div className="featuredMovieCTA-image">
          <a href="/movie/the-batman" style={{ textDecoration: "none" }}>
            <h1> The Batman (2022)</h1>
          </a>
        </div>
      </div>

      <div className="body-movies">
        <div className="showingNow">
          <h1>Aktuellt på bio</h1>
          <Carousel
            keyBoardControl={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            transitionDuration={500}
            infinite={true}
            responsive={responsive}
          >
            {s.movies
              .slice(10)
              .map(({ path, images, title, length, rated, viewings }) => (
                <Link to={path} className="movie">
                  <img className="movie-image" src={"/images/" + images[0]} />
                  <h2>{title}</h2>
                  <p className="length">{length}</p>
                  <p className="rating">{rated}</p>
                  <p>
                    <button>Mer info</button>
                  </p>
                </Link>
              ))}
          </Carousel>
          ;
        </div>

        <div className="showingNow">
          <h1>Topplistan</h1>
          <Carousel
            keyBoardControl={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            transitionDuration={500}
            infinite={true}
            responsive={responsive}
          >
            {s.movies
              .slice(0, 9)
              .map(({ path, images, title, length, rated }) => (
                <Link to={path} className="movie">
                  <img className="movie-image" src={"/images/" + images[0]} />
                  <h2>{title}</h2>
                  <p className="length">{length}</p>
                  <p className="rating">{rated}</p>
                  <p>
                    <button>Mer info</button>
                  </p>
                </Link>
              ))}
          </Carousel>
          ;
        </div>

        <div className="comingSoon">
          <h1>Kommer snart på bio!</h1>
          <SlideShow>
            {[
              ...new Array(
                "hebWYacbdvc",
                "ZfVYgWYaHmE",
                "WWWDskI46Js",
                "32RAq6JzY-w",
                "QsudEHsuvIg",
                "AHmCH7iB_IM",
                "02PPMPArNEQ"
              ),
            ].map((x, i) => (
              <div className="slide">
                {" "}
                (
                <YouTube className="trailer" videoId={x} opts={opts} />
              </div>
            ))}
          </SlideShow>
        </div>

        <div className="news">
          <h1>Nyheter och kampanjer</h1>
          <Carousel
            autoPlay={true}
            autoPlaySpeed={20000}
            transitionDuration={500}
            infinite={true}
            responsive={responsiveNews}
          >
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-biograf.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Ironboy Films öppnar sin andra biosalong! Hela världen jublar.
              </p>
            </div>
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-family.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Kom ut från hemmet och njut av en film för hela familjen med
                vårt oslagbara låga familjpaket pris.
              </p>
            </div>
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-godis.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Ironboy Films slår tillbaka mot SF. "Vem är ni ens?", säger dom
                i intervju...
              </p>
            </div>
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-reklam.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Gå med i medlemsklubben och ta del av massvis med kampanjer och
                rabatter.
              </p>
            </div>
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-restaurang.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Numera kan man njuta av middag och en god drink innan bion i
                Ironboy's nya lounge & michelin prisade restaurang.
              </p>
            </div>
            <div className="news-wrapper">
              <img
                className="news-image"
                src="/images/news-tommy.jpg"
                alt="batat"
              />
              <p className="news-tag">
                Tommy - "Jag ska vrida och vända på varenda sten tills jag
                blivit bästa vän med Thomas "Ironboy" Frank."
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}
