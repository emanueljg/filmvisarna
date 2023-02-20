export default function generate() {
  let confNum = '';
  while (confNum.length < 6) {
    confNum += randomCharacterFromString(
      confNum.length < 3 ?
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' :
        '0123456789'
    )
  }
  return confNum;
}

function randomCharacterFromString(str) {
  // str.length -> length of string
  // Math.random() -> number between 0 and 0.99999999
  // Math.floor() -> remove/truncate decimals, 2.999999 -> 2
  return str[Math.floor(Math.random() * str.length)];
}