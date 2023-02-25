export default function generate() {
  let confNum = "";
  while (confNum.length < 8) {
    confNum += randomCharacterFromString(
      confNum.length < 4 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "0123456789"
    );
  }
  return confNum;
}

function randomCharacterFromString(str) {
  return str[Math.floor(Math.random() * str.length)];
}
