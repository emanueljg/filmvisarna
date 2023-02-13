export function createCategoryList(movies) {
  let categories = [];
  // loop through movies and add the movies
  // genres to the category list
  for (let movie of movies) {
    categories = [...categories, ...movie.genre];
  }
  // remove duplicates 
  categories = [...new Set(categories)];
  return categories;
}