import { useStates } from "../utilities/states";
import { useParams } from "react-router-dom";
import React from "react";

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

  const shownMovieAttrs = new Map();
  shownMovieAttrs.set("title", "Originaltitel");
  shownMovieAttrs.set("release", "Premiär");
  shownMovieAttrs.set("rated", "Åldersgräns");
  shownMovieAttrs.set("length", "Speltid");
  shownMovieAttrs.set("genre", "Genre");
  shownMovieAttrs.set("language", "Tal");
  shownMovieAttrs.set("subtitles", "Text");
  shownMovieAttrs.set("director", "Regi");
  shownMovieAttrs.set("actors", "Medverkande");
  for (const kv of Object.entries(movie || {})) {
    const shownAttr = shownMovieAttrs.get(kv[0]);
    // in-place replacement
    if (shownAttr) shownMovieAttrs[shownMovieAttrs.get(kv[0])] = kv[1];
  }

  const [open, setOpen] = React.useState(true);
  const handleOpen = (event) => {
    setValue(event.target.value);
    setOpen(!open);
  };

  function dateRead(date_str) {
    return new Date(date_str).toLocaleString("sv-SE");
  }

  return !movie ? null : (
    <div className="movieDetail">
      <img className="movie-poster" src={"/images/" + movie.images[0]} />
      <div className="movie-background">
        <div className="gradient">
          <img className="background-image"src={"/images/" + movie.background[0]} />
          </div>
        </div>
      <h2>{movie.title}</h2>
      <div className="movieDescription">{description}</div>
      {Object.entries(shownMovieAttrs).map(([key, value]) => (
        <>
          {
            <>
              <h4 className="descriptorTitle">{key}</h4>
              <p>{value instanceof Array ? value.join(", ") : value}</p>
            </>
          }
        </>
      ))}
      ;
      <div className="dagvaljare">
        <h2 className="valj-dag">Välj tid</h2>
        <div className="dagar">
          {movie.viewings.map((v) => (
            <a href={"/" + v.start_date.replace(":", "-")} className="timelink">
              {dateRead(v.start_date)} - {dateRead(v.end_date)} (Salong {v.room}
              )
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
