import { useStates } from "../utilities/states";
import { useState } from "react";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tickets.css'


export default function Tickets() {
  const xmas95 = new Date("December 25, 1995 23:15:30");
  const options = { weekday: "long" };
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1} - ${" " + ('idag')}`;

  const s = useStates('main')
  let movies = s.sortedMovies;

  let todayISO = new Date().toISOString().slice(0,10);

  const l = useStates({
    chosenCategory: 'Alla genrer',
    possibleSorts: ['Sort by name', 'Sort by length'],
    chosenSort: 'Sort by name',
    sortDone: '',
    chosenViewing: todayISO,
    // note: copying the movies array from main
    // - slice() copies an array
    // this means when we sort the copy in the local state
    // of this compoenent, and this does not
    // trigger a re-mount of the component
    // (which we otherwise would happen if changing
    // a higer level state variable)
    movies: Array.prototype.slice.call(s.sortedMovies),
  });

  const handleSearch = (e) => {
    const result = movies.filter(movie => {
      if (e.target.value === "") return movies
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setQueryState({
      query: e.target.value,
      listOfMovies: result
    })
  }

  const [queryState, setQueryState] = useState({
    query: "",
    listOfMovies: []
  })


  function filterByCategory(movie) {
    return l.chosenCategory === 'Alla genrer' || movie.genre.includes(l.chosenCategory);
  }

  function filterByViewing(movie) {
    let startDates = movie.viewings.map(x => x.start_date.slice(0,10));
    for (let startDate of startDates) {
      if (l.chosenViewing === startDate) { return true; }
    }
    return false;
  }

  

  function sortMoviesAlphabetically() {
    if (l.movies.length === 0 || s.sortedMovies.length > 0) {
      return;
    }
    let sorted = l.movies.slice().sort(function (a, b) {
      return a.title[0].localeCompare(b.title[0])
    });
    let byAlpha = []
    for (let i = 0; i < sorted.length; i++) {
      let m = sorted[i].title.toUpperCase();
      byAlpha[m] = byAlpha[m] || []
      byAlpha[m].push(sorted[i])
    }
    s.sortedMovies = byAlpha;
  }



  useEffect(() => {
    // important: conditions so we don't get an endless loop to useEffects
  }, []);

  let currentLetter = ""
  return <section className="main">
    <section className="filterInnerWrapper">
      <ul className="filtersList">
        <li className="filterDay">
          <span className="pickDay">Välj dag</span>
          <section className="selectDay">
            <select {...l.bind('chosenViewing')}>
              <option value={todayISO}>{date}</option>
              {s.showing.map(viewings => <option>
                {viewings.start_date.slice(0,10)}
              </option>)}
            </select>
          </section>
        </li>
        <li className="filterGenre">
          <span className="pickGenre">Välj genre</span>
          <section className="selectGenre">
            <select {...l.bind('chosenCategory')}>
              <option>Alla genrer</option>
              {s.categories.map(category => <option>
                {category}
              </option>)}
            </select>
          </section>
        </li>
        <li className="filterFilm">
          <span className="pickFilm">Sök</span>
          <form className="selectFilm">
            <input type="search" value={queryState.query} onChange={handleSearch}placeholder="Sök.." />
          </form>
          <ul>{(queryState.query === "" ? '' : queryState.listOfMovies.map(movie => { return <li className="search" >{movie.title}</li> }))}
          </ul>
        </li>
      </ul>

      <section className="moviesWrapper">
        {
          l.movies.filter(filterByCategory).filter(filterByViewing).map(({ path, title, images, genre, length, rated }) => <section className="wrapperImages">
            {currentLetter !== title[0] && (currentLetter = title[0]) && null}
             <section className="letter">
              <h3>{currentLetter}</h3>
            </section>
            <section className="movieInfo clear-fix">
              <Link to={path} style={{ textDecoration: 'none' }}>

                <img className="poster-50-percent" src={'/images/' + images[0]} />

                <section className="movieText">
                  <h3 className="movieTitle">{title}</h3>
                  <h4>
                    <span>{genre.join(', ')}</span>
                    <span className="length">{length}</span>
                    <span className="rated">{rated}</span>
                  </h4>
                </section>
              </Link>
            </section>
          </section>)
        }



      </section>
    </section>

  </section>




}
