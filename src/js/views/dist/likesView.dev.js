"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLike = exports.renderLike = exports.toggleLikeMenu = exports.toggleLikeBtn = void 0;

var _base = require("./base");

var _searchView = require("./searchView");

var toggleLikeBtn = function toggleLikeBtn(isLiked) {
  var iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', "img/icons.svg#".concat(iconString));
};

exports.toggleLikeBtn = toggleLikeBtn;

var toggleLikeMenu = function toggleLikeMenu(numLikes) {
  _base.elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

exports.toggleLikeMenu = toggleLikeMenu;

var renderLike = function renderLike(like) {
  var markUp = "\n  <li>\n    <a class=\"likes__link\" href=\"#".concat(like.id, "\">\n      <figure class=\"likes__fig\">\n          <img src=\"").concat(like.img, "\" alt=\"").concat(like.title, "\">\n      </figure>\n      <div class=\"likes__data\">\n          <h4 class=\"likes__name\">").concat((0, _searchView.limitRecipeTitle)(like.title), "</h4>\n          <p class=\"likes__author\">").concat(like.author, "</p>\n      </div>\n    </a>\n  </li>\n  ");

  _base.elements.likesList.insertAdjacentHTML('afterbegin', markUp);
};

exports.renderLike = renderLike;

var deleteLike = function deleteLike(id) {
  var el = document.querySelector("a.likes__link[href*=\"".concat(id, "\"]")).parentElement;
  if (el) el.parentElement.removeChild(el);
};

exports.deleteLike = deleteLike;