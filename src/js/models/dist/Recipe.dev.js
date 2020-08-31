"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Recipe =
/*#__PURE__*/
function () {
  function Recipe(id) {
    _classCallCheck(this, Recipe);

    this.id = id;
  }

  _createClass(Recipe, [{
    key: "getRecipe",
    value: function getRecipe() {
      var res;
      return regeneratorRuntime.async(function getRecipe$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _axios["default"])("https://forkify-api.herokuapp.com/api/get?rId=".concat(this.id)));

            case 3:
              res = _context.sent;
              this.title = res.data.recipe.title;
              this.author = res.data.recipe.publisher;
              this.img = res.data.recipe.image_url;
              this.url = res.data.recipe.publisher_url;
              this.ingredients = res.data.recipe.ingredients;
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              alert('Something went wrong :(');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "calcTime",
    value: function calcTime() {
      // Assuming that we need 15 min for each 3 ingredients
      var numIng = this.ingredients.length;
      var periods = Math.ceil(numIng / 3);
      this.time = periods * 15;
    }
  }, {
    key: "calcServings",
    value: function calcServings() {
      this.servings = 4;
    } // For this function rewatch lect 149.

  }, {
    key: "parseIngredients",
    value: function parseIngredients() {
      var unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'oz', 'ozs', 'oz,', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      var unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'oz', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
      var units = [].concat(unitsShort, ['kg', 'g']);
      var newIngredients = this.ingredients.map(function (el) {
        // 1. Uniform units.
        var ingredient = el.toLowerCase();
        unitsLong.forEach(function (unit, i) {
          ingredient = ingredient.replace(unit, unitsShort[i]);
        }); // 2. Remove parentheses.

        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // 3. Parse ingredients into count, unit and ingredients.

        var arrIng = ingredient.split(' ');
        var unitIndex = arrIng.findIndex(function (el2) {
          return units.includes(el2);
        });
        var objInt;

        if (unitIndex > -1) {
          // There is a unit.
          var arrCount = arrIng.slice(0, unitIndex);
          var count;

          if (arrCount.length === 1) {
            count = eval(arrIng[0].replace('-', '+'));
          } else {
            count = eval(arrIng.slice(0, unitIndex).join('+'));
          }

          objInt = {
            count: count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex + 1).join(' ')
          };
        } else if (parseInt(arrIng[0], 10)) {
          // There is No Unit, but 1st number is number.
          objInt = {
            count: parseInt(arrIng[0], 10),
            unit: '',
            ingredient: arrIng.slice(1).join(' ')
          };
        } else if (unitIndex === -1) {
          // There is NO unit and NO Number in 1st position.
          objInt = {
            count: 1,
            unit: '',
            ingredient: ingredient
          };
        }

        return objInt;
      });
      this.ingredients = newIngredients;
    }
  }, {
    key: "updateServings",
    value: function updateServings(type) {
      var _this = this;

      // Servings
      var newServings = type === 'dec' ? this.servings - 1 : this.servings + 1; // Ingredients

      this.ingredients.forEach(function (ing) {
        ing.count *= newServings / _this.servings;
      });
      this.servings = newServings;
    }
  }]);

  return Recipe;
}();

exports["default"] = Recipe;