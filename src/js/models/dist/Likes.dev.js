"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Likes =
/*#__PURE__*/
function () {
  function Likes() {
    _classCallCheck(this, Likes);

    this.likes = [];
  }

  _createClass(Likes, [{
    key: "addLike",
    value: function addLike(id, title, author, img) {
      var like = {
        id: id,
        title: title,
        author: author,
        img: img
      };
      this.likes.push(like); // Presist data in localStorage

      this.presistData();
      return like;
    }
  }, {
    key: "deleteLike",
    value: function deleteLike(id) {
      var index = this.likes.findIndex(function (el) {
        return el.id === id;
      });
      this.likes.splice(index, 1); // Presist data in localStorage

      this.presistData();
    }
  }, {
    key: "isLiked",
    value: function isLiked(id) {
      return this.likes.findIndex(function (el) {
        return el.id === id;
      }) !== -1;
    }
  }, {
    key: "getNumOfLikes",
    value: function getNumOfLikes() {
      return this.likes.length;
    }
  }, {
    key: "presistData",
    value: function presistData() {
      localStorage.setItem("likes", JSON.stringify(this.likes));
    }
  }, {
    key: "readStorage",
    value: function readStorage() {
      var storage = JSON.parse(localStorage.getItem("likes")); // Restore from localStorage

      if (storage) this.likes = storage;
    }
  }]);

  return Likes;
}();

exports["default"] = Likes;