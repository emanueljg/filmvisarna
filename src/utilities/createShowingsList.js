export function createShowingsList(movies) {
  let showing = [];
  // loop through movies and add the movies
  // genres to the category list
  for (let movie of movies) {
    showing = [...showing, ...movie.viewings.slice(0,1)];
  }
  // remove duplicates 
  //showing = [...new Set(showing)];
  return showing;
}