import { useStates } from './utilities/states';
import { useParams } from 'react-router-dom';
import  React from 'react'; 





export default function MovieDetail() {

  // get the route param moviePath - (kebabanized name of movie from url)
  const { moviePath } = useParams();

  // get the main state (declared in App component) 
  // - it contains the movies array
  const s = useStates('main');

  // get the correct movie depedning on the value of moviePath
  // (might be undefined initially before the movies have loaded)
  const movie = s.movies.find(movie => movie.path === '/movie/' + moviePath);

  // fix description turn into jsx with p tags
  let description = movie && movie.description.split('<p>')
    .map(x => x.replace(/<\/p>/g, '')) // one array element per p tag
    .map(x => <p className="movieDescription">{x}</p>) // new p tags as jsx

  // properties that we don't want to display
  // in the loop through all properties
  // title -> since we display it separately
  // images -> since we display them separately
  // description -> since we display it separately
  // path -> because it is not meant as human readable info
  // reviews -> since it is an object - requires extra parsing (should be done later)
  const dontShow = ['images', 'description', 'path', 'reviews', 'stars', 'productionCountries',
                    'viewings'];

  const swedishTl = new Map();
  swedishTl.set('title', 'Originaltitel');
  swedishTl.set('release', 'Premiär');
  swedishTl.set('rated', 'Åldersgräns');
  swedishTl.set('length', 'Speltid');
  swedishTl.set('genre', 'Genre');
  swedishTl.set('language', 'Tal');
  swedishTl.set('subtitles', 'Text');
  swedishTl.set('director', 'Regi');
  swedishTl.set('actors', 'Medverkande');
  for (const kv of Object.entries(movie)) {
    if(dontShow.some(x => x == kv[0])) continue; 
    swedishTl[swedishTl.get(kv[0])] = kv[1];
  }

  // loop through the properties of the movie
  // but: just for a fast preview - it is better to 'handcode'
  // your html/jsx for nice page design - instead of looping
  const [open, setOpen] = React.useState(true);
  const handleOpen = (event) => {
      setValue(event.target.value);
     setOpen(!open);
  };
const [value, setValue] = React.useState('1');
  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };
  const hours = [
  '14:30 salong 1   ',
  '15:00 salong 2   '
  ];

   const time = hours.map(hour =>
    <li className='salong'>
      
        {hour}
      
      <button className='menu-item-button' onClick={handleOpen} > Välj platser</button>
    </li>
  );
  const handleChange = (event) => {
    setValue(event.target.value);
    { handleOpen };
  
 };

  function dateRead(date_str) {
    return new Date(date_str).toLocaleString('sv-SE');
  }

   const days = [
  '28/2 lördag  ',
  '29/2 söndag   '
];
  const date = days.map(day =>
    <li>
      <button onClick={handleOpen} >{day}</button>
      
    </li>
  );
  return !movie ? null : <div className="movieDetail">
    {/* Display info about the movie - 
        but not the properties title, path, reviews (for now) */}
    <img src={'/images/' + movie.images[0]} />
    <h2>{movie.title}</h2>
    <div className="movieDescription">
      {description}
    </div>
    {Object.entries(swedishTl).map(([key, value]) => <>{
      dontShow.includes(key) ? null : <>
        <h4 className="descriptorTitle">{key}</h4>
        <p>{value instanceof Array ? value.join(', ') : value}</p>
      </>
    }</>)
    };

    <div className='dagvaljare'>
      <h2 className='valj-dag'>Välj tid</h2>
      <div classname='dagar'>
        {
          movie.viewings.map((v)=>(
            <a href="www.google.com" className="timelink">
              {dateRead(v.start_date)} - {dateRead(v.end_date)} (Salong {v.room})
            </a>))
        }
      </div>
    </div>
  </div>
}
