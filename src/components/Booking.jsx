import { useStates } from "../utilities/states"
import { useParams } from "react-router-dom"
import SeatForm from "./SeatForm";

export default function Booking() {
  const { bookingPath } = useParams();
  const s = useStates('main');

  //deklarera variabler; film, sal, visning(datum och tid)
  //const movie = s.movies.find(movie => movie.path === '/movie/' + bookingPath.split("/")[0]);
  //const show = movie.viewings.find(show === '/movie/' + bookingPath.split("/")[1]);
  //const theatre = show.room; // 1 är stora salen, 2 är lilla, ska förtydligas när det är kopplat ordentligt.
  
  return <div className="bookingPage">
    <button className="backButton">
      Tillbaka
    </button>
    <div className="chosenMovie">
      <img/>
      <h2>Film</h2>
      <p>Sal</p>
      <p>visning</p>
      <div className="ticketSelector">
      </div>
    </div>
    <div className="seatingGrid-large"/>
  </div>
}