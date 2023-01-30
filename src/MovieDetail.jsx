import { useStates } from './utilities/states';
import { useParams } from 'react-router-dom';

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
  const dontShow = ['title', 'images', 'description', 'path', 'reviews'];

  // loop through the properties of the movie
  // but: just for a fast preview - it is better to 'handcode'
  // your html/jsx for nice page design - instead of looping
  return !movie ? null : <div className="movieDetail">
    {/* Display info about the movie - 
        but not the properties title, path, reviews (for now) */}
    <img src={'/images/' + movie.images[0]} />
    <h2>{movie.title}</h2>
    <div className="movieDescription">
      {description}
    </div>
    {Object.entries(movie).map(([key, value]) => <>{
      dontShow.includes(key) ? null : <>
        <h4 className="descriptorTitle">{key}</h4>
        <p>{value instanceof Array ? value.join(', ') : value}</p>
      </>
    }</>)
    }
    <div className="dropdown">
      <button>'Click' me!</button>
    </div>
  </div>
}