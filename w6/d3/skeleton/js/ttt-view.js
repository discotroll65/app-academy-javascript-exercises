(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$gameContainer = $el;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var $container = this.$gameContainer;
    for (var i=0; i< 3; i++) {
      $('<div>').addClass('row').appendTo($container);
      for (var j = 0; j < 3; j++){
        $('<div>').addClass('cell').appendTo($container.last());
      }
    }
  };
})();
