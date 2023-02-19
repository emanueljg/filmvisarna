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
      {el}
    </div>
  );
}



