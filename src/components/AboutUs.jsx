const snacks = [
  ["Liten popcorn", "50 kr"],
  ["Mellan popcorn", "60 kr"],
  ["Stor popcorn", "70 kr"],
  ["Liten baconsnacks", "35 kr"],
  ["Mellan baconsnacks", "45 kr"],
  ["Stor baconsnacks", "55 kr"],
];

const candy = [
  ["Snickers", "15 kr"],
  ["Mars", "15 kr"],
  ["Twix", "15 kr"],
  ["Bounty ", "15 kr"],
  ["Kit ka", "15 kr"],
  ["Coca-Cola", "20 kr"],
  ["Pepsi-Cola", "20 kr"],
  ["Sprite", "20 kr"],
  ["Fanta", "20 kr"],
  ["7-Up", "20 kr"],
  ["Zingo", "20 kr"],
  ["Ye Olde Water", "20 kr"],
  ["Lösvikt", "9,90 kr / hg"],
];

const tickets = [
  ["Barn (under 12 år)", "65 kr"],
  ["Ordinarie", "85 kr"],
  ["Senior", "65 kr"],
  ["Två vuxna & två barn", "249 kr"],
  ["Familj-paket", "299 kr"],
];

export default function AboutUs() {
  let el = (
    <table className="info">
      <tbody className="info">
        <h2>
          Biljett Priser <i class="fa-solid fa-ticket"></i>
        </h2>
        {[...tickets].map(([type, price]) => (
          <tr>
            <td>{type}</td>
            <td>{price}</td>
          </tr>
        ))}
        <h2>
          BIO SNACKS <i class="fa-solid fa-cookie-bite"></i>
        </h2>
        {[...snacks, ...candy].map(([food, price]) => (
          <tr>
            <td>{food}</td>
            <td>{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="background">
        <img className="bg" src="/images/om-oss.jpg" alt="background" />
      </div>
      <div className="container">
        <h1 className="aboutus">Sveriges överlägset bästa biografkedja!</h1>
        <p className="about">
          Vårt varumärkeslöfte, We Make Movies The Best, innebär att vi alltid
          strävar efter att erbjuda de mest minnesvärda och omvälvande
          upplevelserna i biografer i världsklass. Vi är stolta över att göra
          det genom ett förstklassigt bemötande från vår personal, stor duk,
          bekväma VIP-fåtöljer med maximal komfort tillsammans med den bästa
          tekniken för ljud och bild, genom våra egna iSense-salonger och vårt
          partnerskap med IMAX och Dolby Cinema samt ett brett utbud av mat,
          snacks, godis och dryck i våra biografers butiker. Dessutom utvecklar
          vi löpande våra digitala plattformar där man enkelt kan finna
          inspiration och information samt boka platser på våra föreställningar
          och ta del av medlemsförmåner genom vårt lojalitetsprogram. Ironboy
          Films som arbetsgivare erbjuder sina medarbetare karriärsmöjligheter
          och en arbetsmiljö som inspirerar. Vi är övertygade om att en
          förutsättning för att höja besöket på vår biograf är ett team som
          känner passion för film och brinner för att leverera den bästa möjliga
          upplevelsen till våra gäster.
        </p>
        <div className="snacks">
          {el}
          <img className="popcorn" src="/images/popcorn1.png" alt="popcorn" />
        </div>
        <div className="biograf">
          <h2>
            Vart hittar du oss?
            <p className="biograf-info">
              Ironboy Films biograf byggdes år 2021 under Malmö Opera i jakt på
              den absolut bästa ljud isoleringen och få akustik i världsklass.
            </p>
          </h2>
          <h3>
            Adress <i class="fa-solid fa-person-walking"></i>
          </h3>
          <p>Östra Rönneholmsvägen 20, 211 47 Malmö</p>
          <h3>
            Telefonnummer <i class="fa-solid fa-phone"></i>
          </h3>
          <p>Tel: 040 20 85 01</p>
          <h3>
            Öppetider <i class="fa-solid fa-door-open"></i>
          </h3>
          <p>Måndag-Fredag: 16:30 - ca 00:00</p>
          <p>Lördag: 12:00 - ca 00:00</p>
          <p>Söndag: 12:00 - ca 00:00</p>
        </div>

        <div className="salong-info">
          <h2>
            Våra Salonger <i class="fa-solid fa-video"></i>
          </h2>
          <div className="maximus">
            <h3 className="maximus-title">Maximus | IMAX Enhanced</h3>
            <img
              className="salong-img"
              src="/images/maximus.jpg"
              alt="cinema"
            />
            <p className="maximus-info">
              Maximus är våran större salong som rymmer upp till 81 personer
              fördelat på 8 rader. Alla platserna är VIP stolar av högsta
              kvalitet för en oslagbar komfort. Våran duk är en 300" stor IMAX
              duk kombinerat med en projektor av högsta rang som får dig att
              helt försvinna in i filmen. Ljudet i salongen består av 106
              högtalare som är certifierade av THX: THX certified CINEMA som ger
              dig en makalös upplevelse. Du kommer aldrig se en film hemma i
              soffan igen.
            </p>
          </div>
          <div className="dominus">
            <h3 className="dominus-title">Dominus | Dolby Atmos</h3>
            <img
              className="salong-img"
              src="/images/dominus.jpg"
              alt="cinema"
            />
            <p className="dominus-info">
              Dominus är våran lite mindre salong som rymmer upp till 55
              personer fördelat på 6 rader. Alla platserna är VIP stolar av
              högsta kvalitet för en oslagbar komfort. Våran duk är en 200" stor
              IMAX duk kombinerat med en projektor av högsta rang som ger dig en
              bildupplevelse du inte tidigare upplevt. För att kompensera att
              Dominus är en lite mindre salong men samtidigt ge dig en
              oförglömlig bio upplevelse är denna utrustad med 213 högtalare
              från Dolby Atmos som får dig att känna se och nästan till och med
              lukta ljudet runt om kring dig. Även om denna salong är mindre kan
              den nästan kännas större än Maximus tack vare Dolby Atmos 3D
              objekt baserade ljud. Om du inte är nöjd...Kom inte tillbaka.
            </p>
          </div>
        </div>
        <div className="faq">
          <h2 className="faq-title">FAQ</h2>
          <p className="question">
            Får man lov att ta med sig eget godis in på bion?
          </p>
          <p className="answer">
            Svar: Nej det får du inte. Det finns tillgänglighet till allt godis
            du kan tänka dig i våran godisbutik.
          </p>
          <p className="question">Finns det toaletter på biografen?</p>
          <p className="answer">
            Svar: Det finns 4 herrtoaletter och 4 damtoaletter och 2 för
            handikapp.
          </p>
          <p className="question">
            Hur lång tid innan filmen ska man vara på plats?
          </p>
          <p className="answer">
            Svar: Vi rekommenderar att du är på plats inne i salongen vid start
            tiden. Trailers börjar visas 15minuter innan föreställningen
            börjar.Det finns ingen fast tid för dig att anlända till filmen.
            Biljett personal finns på plats under hela filmen och dörren är
            alltid olåst in till filmen.
          </p>
          <p className="question">Får man prata under filmen?</p>
          <p className="answer">
            Svar: Det är ingen regel att du inte får lov att prata med din
            kompis. Men det uppskattas om man kan viska eller hålla en väldigt
            låg nivå så att man inte stör andra. Skratta uppskattas!
          </p>
          <p className="question">
            Får man lov att ha ljud på sin mobil och ta emot samtal?
          </p>
          <p className="answer">
            Svar: Du ska helst ha stängt av ljudet på din telefon. Men vi kan
            förstå att det kanske kan vara viktigt att ljudet igång på sin
            telefon. Tänker du ta emot ett samtal hänvisar vi till att du går ut
            ifrån salongen innan du börjar prata.
          </p>
          <p className="question">
            Vad händer med min biljett om jag inte hinner till filmen? Får jag
            tillbaka pengarna?
          </p>
          <p className="answer">
            Svar: Tyvärr får du inte tillbaka pengarna då din plats kunde ha
            sålts till någon annan istället. MEN vi förstår att saker och ting
            kan komma emellan. Så fram tills 1 timme innan filmen är det möjligt
            att returnera din biljett. Efter det är det möjligt att boka om till
            en annan visning för en mindre summa.
          </p>
          <p className="question">
            Vad kan jag göra om jag inte är nöjd med upplevelsen?
          </p>
          <p className="answer">
            Svar: Tvätta ögonen och ta ur öronpropparna och se en film igen. Är
            du inte nöjd efter andra gången så är det något fel på dig.
          </p>
        </div>
      </div>
    </>
  );
}
