import { useStates } from "../utilities/states"
import { useParams } from "react-router-dom"

export default function Booking() {
  const { bookingPath } = useParams();
  const s = useStates('main');

  const movie = s.movies.find(movie => movie.path === '/movie/' + moviePath);
  const theatre = s.theatres.find();
  const showing = s.showings.find();


  return <div className="bookingPage">
    <button className="backButton">
    Tillbaka
    </button>
    <div className="chosenMovie">
      <img src={'/images/' + movie.images[0]} />
      <h2>{movie.title}</h2>
      <p>{theatre}</p>
      <p>{showing}</p>
      <div className="ticketSelector">
        
      </div>

    </div>
    <div className="seatingGrid">

    </div>
    <div className="paymentForm">

    </div>
  </div>
}