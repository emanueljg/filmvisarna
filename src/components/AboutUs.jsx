const snacks = [
  ["liten popcorn", 50, "kr"],
  ["mellan popcorn", 60, "kr"],
  ["stor popcorn", 70, "kr"],
  ["liten baconsnacks", 35, "kr"],
  ["mellan baconsnacks", 45, "kr"],
  ["stor baconsnacks", 55, "kr"]
];

const candy = [
  ["Snickers", 15, "kr"],
  ["Mars", 15, "kr"],
  ["Twix", 15, "kr"],
  ["Bounty ", 15, "kr"],
  ["Kit ka", 15, "kr"],
  ["Coca-Cola", 20, "kr"],
  ["Pepsi-Cola", 20, "kr"],
  ["Sprite", 20, "kr"],
  ["Fanta", 20, "kr"],
  ["7-Up", 20, "kr"],
  ["Zingo", 20, "kr"],
  ["Ye Olde Water", 20, "kr"]
];

export default function AboutUs() {


  let el = <table>
    <tbody>
      {[...snacks, ...candy].map(([food, price, kr]) => <tr>
        <td>{food} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>

        <td>{price}</td>
        <td>{kr}</td>
      </tr>)}
    </tbody>
  </table>;

  return (
    <div className="table2">
      <div className="popcorn1">
        <img src="/images/popcorn1.png" alt="popcorn1" />
      </div>
      <h2 className="aboutus">Sveriges överlägset bästa biografkedja!</h2>
      <p className="text"> Ironboy Films samlar Sveriges oberoende biografer.
        Vi är Ironboy Films. Hos oss hittar du biobiljetter till hundratals filmer och biografer över hela Sverige!
        Vi som driver Ironboy Films är en organisation som finns till för att hjälpa Sveriges oberoende biografer att hitta sin publik.
        Vi startade sajten 2022 för att vi ville hjälpa publiken att hitta och köpa biobiljetter till alla dessa fantastiska biografer, på ett enklare och smidigare sätt.
        Idag driver Ironboy Films den största biografkedjan i Sverige med över 5 biografer och 10 salonger.</p>

      <h2>Våra fräsiga salonger</h2>
      <p className="salong">Maximus
        Vår grandiosa Maximus salong erbjuder ljud och bild i världsklass.
        Med 81 säten fördelat på 8 rader får du en perfekt bildupplevelse vart du än sitter i salongen.
        Oavsett om du kommer du på en romantisk biovisning med en partner eller stort kompisgäng så kan ni sitta tillsammans i våra luftiga och bekväma säten.
        Med 125 högtalare utspridd runt hela salongen garanterar vi dig en ljudupplevelse utöver något du upplevt tidigare.
        Vår super maximus basteknik gör att du känner T-Rex från Jurassic Park när den stampar sig allt närmare.
        Dominus
        Dominus är vår systersalong, med sina 55 sittplatser fördelat på 6 rader så är den perfekt för filmer, företagspresentationer och onlinekonserter.
        Denna salongen är utrustad 75 högtalare. Den eminenta salongstorleken tillsammans med vår fina sittplatsfördelningen gör att vistelsen blir bekväm.</p>
      <div className="aboutus_container">
        <div className="snacks3">
          <div className="snacks2">
            <p className="butik">Förbutik:</p>
          </div>
          <div className="snacks"> {el}</div>
        </div>

        <div className="faq">
          <h4>Får man prata i mobilen under filmen?</h4>
          <ul>
            <li>Nej!</li>
          </ul>
          <h4>Får man ta med sig egna snacks?</h4>
          <ul>
            <li>Nej!</li>
          </ul>
          <h4>Får man prata med sina vänner under filmen?</h4>
          <ul>
            <li>Nej!</li>
          </ul>
          <h4>Får man gå på toa under filmen?</h4>
          <ul>
            <li>Ja!</li>
          </ul>
        </div>
      </div>
    </div>

  );
}




