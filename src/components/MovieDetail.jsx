import { useStates } from "../utilities/states";
import { useParams } from "react-router-dom";
import React from "react";
import YouTube from "react-youtube";

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
    <section className="main">
      <section className="container">
        <section className="movie-background" style={{ background: `url(${"/images/" + movie.background[0]})  center top / cover no-repeat` }} >
        </section>
        <section className="gradient">
        </section>
        <section className="asd">
          <section className="title-wrapper">
            <h1 className="movie-title">{movie.title}</h1>
          </section>
          </section>
        <section className="poster-and-title">
      <section className="movie-poster-wrapper">
        <img className="movie-poster-image"src={"/images/" + movie.images[0]} />
          </section>
            <section className="movieDescription">
            <p className="descriptionP">{description}</p>
            <section className="qwerty">
 {Object.entries(shownMovieAttrs).map(([key, value]) => (
        <>
          {
            <>
              <h4 className="descriptorTitle">{key}</h4>
              <p className="descriptorP">{value instanceof Array ? value.join(", ") : value}</p>
            </>
          }
        </>
      ))}
      
</section>
          </section>

          <section className="movie-glr-wrap">
            <ul>
            {movie.genre.map(genre => (
                <li className="genreTag">{genre}</li>
              
            ))}
                  </ul>
                    <h4 className="movie-length">{movie.length}</h4>
                    <h4 className="movie-rated">{movie.rated}</h4>
          </section>

             </section>
        <YouTube className="detail-trailer" videoId={movie.trailer[0]} />
   
     
      <section className="dagvaljare">
        <h2 className="valj-dag">Välj tid</h2>
        <section className="dagar">
          {movie.viewings.map((v) => (
            <a href={"/" + v.start_date.replace(":", "-")} className="timelink">
              {dateRead(v.start_date)} - {dateRead(v.end_date)} (Salong {v.room}
              )
            </a>
          ))}
        </section>
      </section>
    </section>
  </section>);
}
