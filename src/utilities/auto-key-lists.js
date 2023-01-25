// Omits the need to write 'key={someUniqueKey}'
// for elements in list when mapping them to jsx in React
// - automatically tries to get the key from id or _id,
// if not possible, uses the array index instead

// ONLY INCLUDE ONCE!
// (for example in your App component 
//  or even earlier - in main.jsx)

let ap = Array.prototype;
if (!ap._mapNoAutoKey) {
  let org = ap._mapNoAutoKey = ap.map;
  ap.map = function (...args) {
    // get ids/unique keys
    let ids = org.call(this, (x, i) => x ? (x.id || x._id || i) : i);
    // apply map
    let result = org.apply(this, args);
    // patches with key if React element
    return org.call(result, x =>
      x && x.$$typeof && x.key === null ? { ...x, key: ids.shift() } : x
    );
  }
}