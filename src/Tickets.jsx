import { useStates } from "./utilities/states";
import { useEffect } from 'react';

export default function Tickets() {

  const s = useStates('main')
  let movies = s.movies
  let sortedMovies = s.sortedMovies;

  useEffect(() => {
    // import: conditions so we don't get an endless loop to useEffects
    if (movies.length === 0 || Object.keys(s.sortedMovies).length > 0) { return; }
    // sort movies
    let sorted = movies.slice().sort(function (a, b) {
      return a.title[0].localeCompare(b.title[0])
    });
    let byAlpha = {};
    for (let i = 0; i < sorted.length; i++) {
      let m = sorted[i].title[0].toUpperCase();
      byAlpha[m] = byAlpha[m] || [];
      byAlpha[m].push(sorted[i]);
    }
    s.sortedMovies = byAlpha;
  }, []);





  return <div>
    <h2>Biljetter</h2>
    {Object.entries(s.sortedMovies).map(([letter, movies]) => <div className="movieList">
      <h3>{letter}</h3>
      {movies.map(({ title }) => <div className="movie">
        <p>{title}</p>
      </div>)}
    </div>)}
  </div>;

}
