"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _Search = _interopRequireDefault(require("./models/Search"));

var _Recipe = _interopRequireDefault(require("./models/Recipe"));

var _List = _interopRequireDefault(require("./models/List"));

var _Likes = _interopRequireDefault(require("./models/Likes"));

var searchView = _interopRequireWildcard(require("./views/searchView"));

var recipeView = _interopRequireWildcard(require("./views/recipeView"));

var listView = _interopRequireWildcard(require("./views/listView"));

var likesView = _interopRequireWildcard(require("./views/likesView"));

var _base = require("./views/base");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Global app controller

/** Global state of the app
 * - Search Object.
 * - Current recipe object.
 * - Shoping list object
 * - Liked recipes.
 **/
var state = {};
/**
 * 
 * SEARCH CONTROLLER
 * 
 */

var controlSearch = function controlSearch() {
  var query;
  return regeneratorRuntime.async(function controlSearch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 1- Get query from the view.
          query = searchView.getInput(); // TODO

          if (!query) {
            _context.next = 17;
            break;
          }

          // 2- New search object and add to state.
          state.search = new _Search["default"](query); // 3- Prepare UI for results

          searchView.clearInput();
          searchView.clearResults();
          (0, _base.renderLoader)(_base.elements.searchResults);
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(state.search.getResults());

        case 9:
          // 5- Render result on UI.
          (0, _base.clearLoader)();
          searchView.renderResults(state.search.result);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](6);
          alert('Something went wrong with searching');
          (0, _base.clearLoader)();

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 13]]);
};

_base.elements.searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  controlSearch();
});

_base.elements.searchResAndPages.addEventListener('click', function (e) {
  var btn = e.target.closest('.btn-inline');

  if (btn) {
    var goToPage = parseInt(btn.dataset["goto"], 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
/**
 * RECIPE CONTROLLER
 * 
 */


var controlRecipe = function controlRecipe() {
  var id;
  return regeneratorRuntime.async(function controlRecipe$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Get ID from url.
          id = window.location.hash.replace('#', '');

          if (!id) {
            _context2.next = 19;
            break;
          }

          // Prepare UI for changes.
          recipeView.clearRecipe();
          (0, _base.renderLoader)(_base.elements.recipe); // Highlight selected search item.

          if (state.search) searchView.highLightSelected(id); // Create new recipe object.

          state.recipe = new _Recipe["default"](id);
          _context2.prev = 6;
          _context2.next = 9;
          return regeneratorRuntime.awrap(state.recipe.getRecipe());

        case 9:
          state.recipe.parseIngredients(); // Calculate serving and time

          state.recipe.calcTime();
          state.recipe.calcServings(); // Render recipe.

          (0, _base.clearLoader)();
          recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](6);
          alert('Error In processing recipes!');

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 16]]);
};

['hashchange', 'load'].forEach(function (event) {
  return window.addEventListener(event, controlRecipe);
});
/***
 * LIST CONTROLLER
 * 
 */

var controlList = function controlList() {
  // Create a new list if there in none yet
  if (!state.list) state.list = new _List["default"](); // Add each ingredient to the list and UI

  state.recipe.ingredients.forEach(function (el) {
    var item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}; // Handle delete and update list item events.


_base.elements.shopping.addEventListener('click', function (e) {
  // Important note: don't try to write cameled case datasets
  var id = e.target.closest('.shopping__item').dataset.itemid; // Handle delete button

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id); // Delete from UI

    listView.deleteItem(id); // Handle the count update
  } else if (e.target.matches('.shopping__count--value')) {
    var val = parseFloat(e.target.value);
    state.list.updateCount(id, val);
  }
});
/***
 * LIKE CONTROLLER
 * 
 */


var controlLike = function controlLike() {
  if (!state.likes) state.likes = new _Likes["default"]();
  var currentID = state.recipe.id; // User has not choose his liked recipe

  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    var newLikes = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img); // Toggle the like button

    likesView.toggleLikeBtn(true); // Add like to UI list

    likesView.renderLike(newLikes); // console.log(state.likes);
    // User has choosen his liked recipe
  } else {
    // Remove like to the state
    state.likes.deleteLike(currentID); // Toggle the like button

    likesView.toggleLikeBtn(false); // Remove like to UI list

    likesView.deleteLike(currentID); // console.log(state.likes);
  }

  likesView.toggleLikeMenu(state.likes.getNumOfLikes());
}; // Restore liked recipes on page loads


window.addEventListener('load', function () {
  state.likes = new _Likes["default"](); // Restore likes

  state.likes.readStorage(); // Toggle like menu

  likesView.toggleLikeMenu(state.likes.getNumOfLikes()); // Render the existing likes

  state.likes.likes.forEach(function (like) {
    return likesView.renderLike(like);
  });
}); // Handling recipe button clicks

_base.elements.recipe.addEventListener('click', function (e) {
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