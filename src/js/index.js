// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import *  as searchView from './views/searchView';
import *  as recipeView from './views/recipeView';
import *  as listView from './views/listView';
import *  as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search Object.
 * - Current recipe object.
 * - Shoping list object
 * - Liked recipes.
 **/

const state = {};

/**
 * 
 * SEARCH CONTROLLER
 * 
 */
const controlSearch = async () => {
  // 1- Get query from the view.
  const query = searchView.getInput(); // TODO

  if (query) {
    // 2- New search object and add to state.
    state.search = new Search(query);

    // 3- Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);
    
    try {
      // 4- Search for recipes
      await state.search.getResults();
      
      // 5- Render result on UI.
      clearLoader();
      searchView.renderResults(state.search.result);
      
    } catch (error) {
      alert('Something went wrong with searching');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResAndPages.addEventListener('click', e => {
  let btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});


/**
 * RECIPE CONTROLLER
 * 
 */

const controlRecipe = async () => {
  // Get ID from url.
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes.
    recipeView.clearRecipe()
    renderLoader(elements.recipe);

    // Highlight selected search item.
    if (state.search) searchView.highLightSelected(id);
    
    // Create new recipe object.
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients.
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      
      // Calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      // Render recipe.
      clearLoader();
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      );

    } catch (error) {
      alert('Error In processing recipes!');      
    } 
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/***
 * LIST CONTROLLER
 * 
 */

const controlList = () => {
  // Create a new list if there in none yet
  if (!state.list)
    state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });

};

// Handle delete and update list item events.
elements.shopping.addEventListener('click', e => {
  // Important note: don't try to write cameled case datasets
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id);
    
    // Delete from UI
    listView.deleteItem(id);

  // Handle the count update
  } else if (e.target.matches('.shopping__count--value')) {
    const val = parseFloat(e.target.value);
    state.list.updateCount(id, val);
  }
  
});


/***
 * LIKE CONTROLLER
 * 
 */

const controlLike = () => {
  if (!state.likes)
  state.likes = new Likes();
  
  const currentID = state.recipe.id;
  
  // User has not choose his liked recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLikes = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img,
      );
      
      // Toggle the like button
      likesView.toggleLikeBtn(true);
      
      // Add like to UI list
      likesView.renderLike(newLikes);
      // console.log(state.likes);
      
      // User has choosen his liked recipe
    } else {
      // Remove like to the state
      state.likes.deleteLike(currentID);
      
      // Toggle the like button
      likesView.toggleLikeBtn(false);
      
      // Remove like to UI list
      likesView.deleteLike(currentID);
      // console.log(state.likes);
    }
    
    likesView.toggleLikeMenu(state.likes.getNumOfLikes());
  };
  

// Restore liked recipes on page loads
window.addEventListener('load', () => {
  state.likes = new Likes();
  
  // Restore likes
  state.likes.readStorage();

  // Toggle like menu
  likesView.toggleLikeMenu(state.likes.getNumOfLikes());

  // Render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
  
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) state.recipe.updateServings('dec');
    recipeView.updateServingIngredients(state.recipe);
    
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add igredient to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
  }
});


