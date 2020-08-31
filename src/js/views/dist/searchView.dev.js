"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResults = exports.limitRecipeTitle = exports.highLightSelected = exports.clearInput = exports.clearResults = exports.getInput = void 0;

var _base = require("./base");

var getInput = function getInput() {
  return _base.elements.searchInput.value;
};

exports.getInput = getInput;

var clearResults = function clearResults() {
  _base.elements.searchResultList.innerHTML = "";
  _base.elements.searchResAndPages.innerHTML = "";
};

exports.clearResults = clearResults;

var clearInput = function clearInput() {
  _base.elements.searchInput.value = "";
};

exports.clearInput = clearInput;

var highLightSelected = function highLightSelected(id) {
  var resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(function (el) {
    el.classList.remove('results__link--active');
  });
  document.querySelector("a[href=\"#".concat(id, "\"]")).classList.add('results__link--active');
};

exports.highLightSelected = highLightSelected;

var limitRecipeTitle = function limitRecipeTitle(title) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 17;
  var newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce(function (acc, cur) {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }

      return acc + cur.length;
    }, 0);
    return "".concat(newTitle.join(' '), " ...");
  }

  return title;
}; // No thing will use it out side this module


exports.limitRecipeTitle = limitRecipeTitle;

var renderRecipe = function renderRecipe(recipe) {
  var markup = "\n      <li>\n        <a class=\"results__link\" href=\"#".concat(recipe.recipe_id, "\">\n          <figure class=\"results__fig\">\n            <img src=\"").concat(recipe.image_url, "\" alt=\"").concat(recipe.title, "\">\n          </figure>\n          <div class=\"results__data\">\n            <h4 class=\"results__name\">").concat(limitRecipeTitle(recipe.title), "</h4>\n            <p class=\"results__author\">").concat(recipe.publisher, "</p>\n          </div>\n        </a>\n      </li>\n  ");

  _base.elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

var createButton = function createButton(pageNumber, type) {
  return "\n<button class=\"btn-inline results__btn--".concat(type, "\" data-goto=\"").concat(type === 'prev' ? pageNumber - 1 : pageNumber + 1, "\">\n  <span>Page ").concat(type === 'prev' ? pageNumber - 1 : pageNumber + 1, "</span>\n  <svg class=\"search__icon\">\n    <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-triangle-").concat(type === 'prev' ? 'left' : 'right', "\"></use>\n  </svg>\n</button>\n");
};

var renderButtons = function renderButtons(page, numOfResults, resPrePage) {
  var pages = Math.ceil(numOfResults / resPrePage);
  var button;

  if (page === 1 && pages > 1) {
    // Render Only button to go to next page.
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Render both buttons.
    button = "\n      ".concat(createButton(page, 'next'), "\n      ").concat(createButton(page, 'prev'), "\n    ");
  } else if (page === pages && pages > 1) {
    // Render Only button to go to previous page.
    button = createButton(page, 'prev');
  }

  _base.elements.searchResAndPages.insertAdjacentHTML('afterbegin', button);
};

var renderResults = function renderResults(recipes) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var resultPerPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  // Get results of current pages.
  var start = (page - 1) * resultPerPage;
  var end = page * resultPerPage;
  recipes.slice(start, end).forEach(renderRecipe); // render pagination buttons

  renderButtons(page, recipes.length, resultPerPage);
};

exports.renderResults = renderResults;