import { useStates } from "../utilities/states";
import { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/tickets.css'


export default function Tickets() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1} - ${" " + ('idag')}`;

  const s = useStates('main')
  let movies = s.sortedMovies;
  let todayISO = new Date().toISOString().slice(0,10);

  const l = useStates({
    chosenCategory: 'Alla genrer',
    chosenViewing: todayISO,
    movies: Array.prototype.slice.call(s.sortedMovies),
  });

  


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

  function filterByQuery(movie) {
    return query.toLowerCase() === 'Sök..' || movie.title.toLowerCase().includes(query)
  }

  const [query, setQuery] = useState('');
  
  //To remove duplicate letters when grouping movies alphabetically
  let currentLetter = "";
  function removeDuplicateLetters(currentLetter) {
    const set = new Set();
    for (const section of document.querySelectorAll('.wrapperImages')) {
      if (set.has(section.textContent.trim(currentLetter))) {
        section.parentNode.removeChild(div);
      }
      set.add(section.textContent.trim(currentLetter))
    }
  }




  return <section className="main">
    <section className="filterInnerWrapper">
      <ul className="filtersList">
        <li className="filterDay">
          <span className="pickDay">Välj dag</span>
          <section className="selectDay">
            <select className="chosenViewing"{...l.bind('chosenViewing')}>
              <option value={todayISO}>{date}</option>
              {s.showing.map(viewings => <option>
                {viewings.start_date.slice(0, 10)}
              </option>)}
            </select>
          </section>
        </li>
        <li className="filterGenre">
          <span className="pickGenre">Välj genre</span>
          <section className="selectGenre">
            <select className="chosenCategory" {...l.bind('chosenCategory')}>
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
            <input className="searchBar"type="search" onChange={(e) => setQuery(e.target.value)} placeholder='Sök..' />
          </form>
        </li>
      </ul>

      <section className="moviesWrapper">
        {
          l.movies.filter(filterByCategory).filter(filterByViewing).filter(filterByQuery)
            .map(({ path, title, images, genre, length, rated }) => <section className="wrapperImages">
            <section className="letter">
              <h3 className="currentLetter">
                {currentLetter !== title[0] && (currentLetter = title[0])}
                {removeDuplicateLetters(currentLetter)}</h3>
            </section>
            <Link to={path} style={{ textDecoration: 'none' }}>
            <section className="movieInfo clear-fix">
              <section className="movies">
                <img className="poster-50-percent" src={'/images/' + images[0]} />
                <section className="movieText">
                  <h3 className="movieTitle">{title}</h3>
                  <h4>
                    <span className="genre ">{genre.join(', ')}</span>
                    <span className="length">{length}</span>
                    <span className="rated">{rated}</span>
                  </h4>
                </section>
              </section>
              </section>
            </Link>
          </section>)
        }
      </section>
    </section>
  </section>




}
