import { useStates } from "../utilities/states";
import { Link, useParams, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import YouTube from "react-youtube";
import Booking from "./Booking";

export default function MovieDetail() {
  const { moviePath } = useParams();
  const s = useStates("main");

  const movie = s.movies.find((movie) => movie.path === "/movie/" + moviePath);
  const description =
    movie &&
    movie.description
      .split("<p>")
      .map((x) => x.replace(/<\/p>/g, "")) // one array element per p tag
      .map((x) => <p className="movieDescription">{x}</p>); // new p tags as jsx

  const b = useStates({
    booking: [{ path: "/booking", Component: Booking }],
    chosenViewing: "Alla dagar",
  });

  function filterByViewing(movie) {
    let startDates = movie.viewings.map((x) => x.start_date.slice(0, 10));
    for (let startDate of startDates) {
      if (b.chosenViewing === startDate) {
        return true;
      }
    }
    if (b.chosenViewing === "Alla dagar") {
      return true;
    }
  }

  const shownMovieAttrs = new Map();
  shownMovieAttrs.set("title", "Originaltitel");
  shownMovieAttrs.set("release_year", "Premiär");
  shownMovieAttrs.set("dialogue", "Tal");
  shownMovieAttrs.set("subtitles", "Text");
  shownMovieAttrs.set("directors", "Regi");
  shownMovieAttrs.set("actors", "Medverkande");
  for (const kv of Object.entries(movie || {})) {
    const shownAttr = shownMovieAttrs.get(kv[0]);
    // in-place replacement
    if (shownAttr) shownMovieAttrs[shownMovieAttrs.get(kv[0])] = kv[1];
  }

  const [visable, setVisable] = React.useState(false);
  const handleVisable = (event) => {
    setVisable((current) => !current);
  };
  const [opacity, setOpacity] = useState(1);

  const opts = {
    playerVars: {
      autoplay: true,
    },
  };

  function dateRead(date_str) {
    return new Date(date_str).toLocaleString("sv-SE");
  }

  return !movie ? null : (
    <section className="main">
      {visable && (
        <div className="trailer-container">
          <YouTube
            className="detail-trailer"
            videoId={movie.trailer[0]}
            opts={opts}
          />
          <button
            className="close-button"
            onClick={() => {
              handleVisable();
              setOpacity(1);
            }}
          >
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      )}
      <section
        className="container"
        style={{ opacity, margin: 0, width: "100%" }}
      >
        <section
          className="movie-background"
          style={{
            background: `url(${
              "/images/" + movie.background[0]
            })  center top / cover no-repeat`,
          }}
        >
          <section className="gradient"></section>
        </section>
        <section className="button-container">
          <button
            className="trailer-button"
            onClick={() => {
              handleVisable();
              setOpacity(0.1);
            }}
          >
            <i class="fa-regular fa-circle-play"></i>
          </button>
        </section>
        <section className="asd">
          <section className="title-wrapper">
            <h1 className="movie-title">{movie.title}</h1>
          </section>
        </section>
        <section className="poster-and-title">
          <section className="movie-poster-wrapper">
            <img
              className="movie-poster-image"
              src={"/images/" + movie.images[0]}
            />
            <section className="movie-glr-wrap">
              <ul>
                {movie.genre.map((genre) => (
                  <li className="genreTag">{genre}</li>
                ))}
              </ul>
              <h4 className="movie-length">Längd: {movie.duration}</h4>
              <h4 className="movie-rated">Åldersgräns: {movie.rating}</h4>
            </section>
          </section>
          <section className="movieDescription">
            <p className="descriptionP">{description}</p>
            <section className="qwerty">
              {Object.entries(shownMovieAttrs).map(([key, value]) => (
                <>
                  {
                    <>
                      <h4 className="descriptorTitle">{key}</h4>
                      <p className="descriptorP">
                        {value instanceof Array ? value.join(", ") : value}
                      </p>
                    </>
                  }
                </>
              ))}
            </section>
          </section>
        </section>
        <Routes>
          {b.booking.map(({ path, Component }) => (
            <Route path={movie.path + path} element={<Component />}></Route>
          ))}
        </Routes>
        {b.booking.map(({ path }) => (
          <Link to={movie.path + path} className="x">
            <button className="booking-button">Boka biljett</button>
          </Link>
        ))}
        <section className="dagvaljare">
          <li className="filterDay">
            <span className="pickDay">Välj dag</span>
            <section className="selectDay">
              <select className="chosenViewing" {...b.bind("chosenViewing")}>
                <option>Alla dagar</option>
                {movie.viewings.map((viewings) => (
                  <option>{viewings.start_date.slice(0, 10)}</option>
                ))}
              </select>
            </section>
          </li>
        </section>
      </section>
    </section>
  );
}
