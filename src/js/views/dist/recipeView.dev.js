"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateServingIngredients = exports.renderRecipe = exports.clearRecipe = void 0;

var _base = require("./base");

var _fractional = require("fractional");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var clearRecipe = function clearRecipe() {
  _base.elements.recipe.innerHTML = '';
};

exports.clearRecipe = clearRecipe;

var formatCount = function formatCount(count) {
  if (count) {
    // count 2.5 ---> 2 1/2
    var newCount = Math.round(count * 10000) / 10000;

    var _newCount$toString$sp = newCount.toString().split('.').map(function (el) {
      return parseInt(el, 10);
    }),
        _newCount$toString$sp2 = _slicedToArray(_newCount$toString$sp, 2),
        _int = _newCount$toString$sp2[0],
        dec = _newCount$toString$sp2[1];

    if (!dec) return newCount;

    if (_int === 0) {
      var fr = new _fractional.Fraction(newCount);
      return "".concat(fr.numerator, "/").concat(fr.denominator);
    } else {
      var _fr = new _fractional.Fraction(newCount - _int);

      return "".concat(_int, " ").concat(_fr.numerator, "/").concat(_fr.denominator);
    }
  }

  return '?';
};

var createIngredient = function createIngredient(ingredient) {
  return "\n    <li class=\"recipe__item\">\n        <svg class=\"recipe__icon\">\n            <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-check\"></use>\n        </svg>\n        <div class=\"recipe__count\">".concat(formatCount(ingredient.count), "</div>\n        <div class=\"recipe__ingredient\">\n            <span class=\"recipe__unit\">").concat(ingredient.unit, "</span>\n            ").concat(ingredient.ingredient, "\n        </div>\n    </li>\n");
};

var renderRecipe = function renderRecipe(recipe, isLiked) {
  var markUp = "\n  <figure class=\"recipe__fig\">\n    <img src=\"".concat(recipe.img, "\" alt=\"").concat(recipe.title, "\" class=\"recipe__img\">\n    <h1 class=\"recipe__title\">\n        <span>").concat(recipe.title, "</span>\n    </h1>\n  </figure>\n\n  <div class=\"recipe__details\">\n    <div class=\"recipe__info\">\n        <svg class=\"recipe__info-icon\">\n            <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-stopwatch\"></use>\n        </svg>\n        <span class=\"recipe__info-data recipe__info-data--minutes\">").concat(recipe.time, "</span>\n        <span class=\"recipe__info-text\"> minutes</span>\n    </div>\n    <div class=\"recipe__info\">\n        <svg class=\"recipe__info-icon\">\n            <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-man\"></use>\n        </svg>\n        <span class=\"recipe__info-data recipe__info-data--people\">").concat(recipe.servings, "</span>\n        <span class=\"recipe__info-text\"> servings</span>\n\n        <div class=\"recipe__info-buttons\">\n            <button class=\"btn-tiny btn-decrease\">\n                <svg>\n                    <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-circle-with-minus\"></use>\n                </svg>\n            </button>\n            <button class=\"btn-tiny btn-increase\">\n                <svg>\n                    <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-circle-with-plus\"></use>\n                </svg>\n            </button>\n        </div>\n\n    </div>\n    <button class=\"recipe__love\">\n        <svg class=\"header__likes\">\n            <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-heart").concat(isLiked ? '' : '-outlined', "\"></use>\n        </svg>\n    </button>\n  </div>\n\n\n\n  <div class=\"recipe__ingredients\">\n    <ul class=\"recipe__ingredient-list\">\n        ").concat(recipe.ingredients.map(function (el) {
    return createIngredient(el);
  }).join(''), "\n    </ul>\n\n    <button class=\"btn-small recipe__btn recipe__btn--add\">\n        <svg class=\"search__icon\">\n            <use xlink:href=\"/img/icons.svg#icon-shopping-cart\"></use>\n        </svg>\n        <span>Add to shopping list</span>\n    </button>\n  </div>\n\n  <div class=\"recipe__directions\">\n    <h2 class=\"heading-2\">How to cook it</h2>\n    <p class=\"recipe__directions-text\">\n        This recipe was carefully designed and tested by\n        <span class=\"recipe__by\">").concat(recipe.author, "</span>. Please check out directions at their website.\n    </p>\n    <a class=\"btn-small recipe__btn\" href=\"").concat(recipe.url, "\" target=\"_blank\">\n        <span>Directions</span>\n        <svg class=\"search__icon\">\n            <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-triangle-right\"></use>\n        </svg>\n\n    </a>\n  </div>\n  ");

  _base.elements.recipe.insertAdjacentHTML('afterbegin', markUp);
};

exports.renderRecipe = renderRecipe;

var updateServingIngredients = function updateServingIngredients(recipe) {
  // Update servings
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings; // Update ingredients

  var countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach(function (el, i) {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};

exports.updateServingIngredients = updateServingIngredients;