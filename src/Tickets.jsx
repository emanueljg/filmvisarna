import { useStates } from "./utilities/states";
import { useEffect } from 'react';

export default function Tickets() {

  const s = useStates('main')
  let movies = s.movies
  let sortedMovies = s.sortedMovies;
  //function sortMovies() {
  //var sortTheMovies = s.movies
  // sortTheMovies.sort(function (a, b) {
  //  return a.title[0].localeCompare(b.title[0]);
  //  });

  // var sortedMovies = {};
  // for (var i = 0; i < sortMovies.length; i++) {
  //   var m = sortTheMovies[i].title[0].toUpperCase();
  //   if (sortedMovies[m] && sortedMovies[m].length >= 0)
  //    sortedMovies[m].push(sortTheMovies[i]);
  //  else {
  //    sortedMovies[m] = [];
  //    sortedMovies[m].push(sortTheMovies[i]);
  //  }
  //  console.log(sortedMovies);
  //}
  //}
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
      /*if (sortedMovies[m] && sortedMovies[m].length >= 0)
        sortedMovies[m].push(movies[i]);
      else {
        sortedMovies[m] = [];
        sortedMovies[m].push(movies[i]);
      }*/
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
