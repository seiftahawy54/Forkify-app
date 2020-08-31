"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteItem = exports.renderItem = void 0;

var _base = require("./base");

var renderItem = function renderItem(item) {
  var markup = "\n    <li class=\"shopping__item\" data-itemid=".concat(item.id, ">\n      <div class=\"shopping__count\">\n          <input type=\"number\" value=\"").concat(item.count, "\" step=\"").concat(item.count, "\" class=\"shopping__count--value\">\n          <p>g</p>\n      </div>\n      <p class=\"shopping__description\">").concat(item.ingredient, "</p>\n      <button class=\"shopping__delete btn-tiny\">\n          <svg>\n              <use xlink:href=\"//www.aaaa.world/img/icons.svg#icon-circle-with-cross\"></use>\n          </svg>\n      </button>\n    </li>\n  ");

  _base.elements.shopping.insertAdjacentHTML('beforeend', markup);
};

exports.renderItem = renderItem;

var deleteItem = function deleteItem(id) {
  var item = document.querySelector("[data-itemid=\"".concat(id, "\"]"));
  if (item) item.parentNode.removeChild(item);
};

exports.deleteItem = deleteItem;