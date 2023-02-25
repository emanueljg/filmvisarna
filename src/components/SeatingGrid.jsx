import { useStates } from '../utilities/states.js';

export default function SeatingGrid({ name }) {

    const s = useStates('main');

    // Find the seat info for the audtiorium with matchin name
    let { seatsPerRow } = s.theatres.find(x => x.name === name) || {};
    if (!seatsPerRow) { return null; }

    // Create an array of arrays where each smaller array
    // is a row with each seat number
    let rows = [], counter = 1;
    for (let howMany of seatsPerRow) {
        let row = [];
        for (let i = 0; i < howMany; i++) {
            row.unshift(counter);
            counter++;
        }
        rows.push(row);
    }
    console.log(rows)


    return <div className="auditorium">
        <div className="screen"></div>
        <div className="rows">
            {rows.map(row => <div className="row">
                {row.map(seat => <div className="seat">{seat}</div>)}
            </div>)}
        </div>
    </div>;
}