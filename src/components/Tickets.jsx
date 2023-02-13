import { useStates } from "../utilities/states";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tickets.css'


export default function Tickets() {
  const xmas95 = new Date("December 25, 1995 23:15:30");
  const options = { weekday: "long" };
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1} - ${" " + ('idag')}`;

  const s = useStates('main')
  let movies = s.sortedMovies

  const l = useStates({
    chosenCategory: 'Alla genrer',
    possibleSorts: ['Sort by name', 'Sort by length'],
    chosenSort: 'Sort by name',
    sortDone: '',
    chosenViewing: { date },
    // note: copying the movies array from main
    // - slice() copies an array
    // this means when we sort the copy in the local state
    // of this compoenent, and this does not
    // trigger a re-mount of the component
    // (which we otherwise would happen if changing
    // a higer level state variable)
    movies: s.sortedMovies.slice(),
  });


  function filterByCategory(movie) {
    return l.chosenCategory === 'Alla genrer' || movie.genre.includes(l.chosenCategory);
  }

  function filterByViewing(movie) {
    return l.chosenViewing === { date } || movie.viewings.includes(l.chosenViewing)
  }



  useEffect(() => {
    // important: conditions so we don't get an endless loop to useEffects
    if (movies.length === 0 || Object.keys(s.sortedMovies).length > 0) { return; }
    // sort movies?
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



  return <div className="main">
    <div className="filterInnerWrapper">
      <ul className="filtersList">
        <li className="filterDay">
          <span className="pickDay">Välj dag</span>
          <div className="selectDay">
            <select {...l.bind('chosenViewing')}>
              <option>{date}</option>
              {s.showing.map(viewings => <option>
                {viewings.start_date}
              </option>)}
            </select>
          </div>
        </li>
        <li className="filterGenre">
          <span className="pickGenre">Välj genre</span>
          <div className="selectGenre">
            <select {...l.bind('chosenCategory')}>
              <option>Alla genrer</option>
              {s.categories.map(category => <option>
                {category}
              </option>)}
            </select>
          </div>
        </li>
        <li className="filterFilm">
          <span className="pickFilm">Sök</span>
          <div className="selectFilm">
            <input type="text" placeholder="Sök.." />

          </div>
        </li>
      </ul>

      <div className="moviesWrapper">

        {
          s.sortedMovies.filter(filterByCategory, filterByViewing).map(({ path, title, images, genre, length, rated, letter }) => <div className="wrapperImages">
            <div className="letta">
              <h3>{letter}</h3>
            </div>
            <div className="movieInfo clear-fix">
              <Link to={path} style={{ textDecoration: 'none' }}>

                <img className="poster-50-percent" src={'/images/' + images[0]} />

                <div className="movieText">
                  <h3 className="movieTitle">{title}</h3>
                  <h4>
                    <span>{genre.join(', ')}</span>
                    <span className="length">{length}</span>
                    <span className="rated">{rated}</span>
                  </h4>
                </div>
              </Link>
            </div>
          </div>)
        }



      </div>
    </div>

  </div>




}
