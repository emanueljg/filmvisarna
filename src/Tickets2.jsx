import React from 'react';

export default function Tickets() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
  };

  const handleMenuTwo = () => {
    setOpen(false);
  };

  return <div className='Tickets-text'>
    <h1 className="Tickets-h1">The Batman</h1>
    <img className="Tickets-pic" src={'/images/the-batman.jpg'} />

    <p>I två år har Bruce Wayne vakat över gatorna i Gotham City som Batman. <br />
      När en mördare riktar in sig på Gothams elit med en serie av sadistiska mord,
      leder ett spår av kryptiska ledtrådar in Batman i den undre världen.<br />
      Bevisen leder närmare och närmare hans egen familj och vidden av mördarens planer blir tydliga.<br />
      Batman måste skapa nya allianser och avslöja den skyldige för att rädda Gotham City.</p>
    <p>Regi:</p>
    <p>Matt Reeves</p>

    <h4 className="Tickets-h4">Skådespelare:</h4>
    <p>
      Robert Pattinson, Zoë Kravitz, Colin Farrell, Paul Dano, Andy Serkis, Peter Sarsgaard, John Turturro, Jeffrey Wright
          <br></br>
      Originaltitel:<br></br>
      The Batman
          <br></br>
      Originalspråk:<br></br>
      Engelska
<br></br>
      Premiär:<br></br>
      2 mars 2022</p>

    <h2>Köp biljetter</h2>

    <div>
      <button onClick={handleOpen}>28/ lördag</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleMenuOne}>Lilla salongen</button>
            <ul>
              <div className='wrapper'>
                <button onClick={handleMenuOne} id="button1">19:30</button>
                <button onClick={handleMenuOne} id="button2">Välj platser</button>
              </div>
            </ul>
          </li>
        </ul>
      ) : null}
    </div>

  </div>
}