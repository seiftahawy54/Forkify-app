"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uniqid = _interopRequireDefault(require("uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var List =
/*#__PURE__*/
function () {
  function List() {
    _classCallCheck(this, List);

    this.items = [];
  }

  _createClass(List, [{
    key: "addItem",
    value: function addItem(count, unit, ingredient) {
      var item = {
        id: (0, _uniqid["default"])(),
        count: count,
        unit: unit,
        ingredient: ingredient
      };
      this.items.push(item);
      return item;
    }
  }, {
    key: "deleteItem",
    value: function deleteItem(id) {
      var index = this.items.findIndex(function (el) {
        return el.id === id;
      });
      this.items.splice(index, 1);
    }
  }, {
    key: "updateCount",
    value: function updateCount(id, newCount) {
      this.items.find(function (el) {
        return el.id === id;
      }).count = newCount;
    }
  }]);

  return List;
}();

exports["default"] = List;