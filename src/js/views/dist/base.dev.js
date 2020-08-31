"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLoader = exports.renderLoader = exports.elementStrings = exports.elements = void 0;
var elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results'),
  searchResultList: document.querySelector('.results__list'),
  searchResAndPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};
exports.elements = elements;
var elementStrings = {
  loader: 'loader'
};
exports.elementStrings = elementStrings;

var renderLoader = function renderLoader(parent) {
  var loader = "\n      <div class=\"".concat(elementStrings.loader, "\">\n        <svg>\n          <use xlink:href=\"/img/icons.svg#icon-cw\">\n        </svg>\n      </div>\n  ");
  parent.insertAdjacentHTML('afterbegin', loader);
};

exports.renderLoader = renderLoader;

var clearLoader = function clearLoader() {
  var loader = document.querySelector(".".concat(elementStrings.loader));

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};

exports.clearLoader = clearLoader;