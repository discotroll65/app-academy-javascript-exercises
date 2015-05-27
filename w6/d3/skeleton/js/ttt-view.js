(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$gameContainer = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var game = this.game;
    var that = this;
    $('.square').on('click', function(event){
      var $square = $(event.currentTarget);
      try{
        $square.data("mark", game.currentPlayer);
        game.playMove($square.data("pos"));
        that.makeMove($square);
      }
      catch (error) {
        if (error instanceof TTT.MoveError){
          alert(error.msg);
        } else {
          throw error;
        }
      }
    });
  };

  View.prototype.makeMove = function ($square) {
    var mark = $square.data("mark");
    var game = this.game;
    $square.removeClass("unplayed").addClass("played " + mark).append(mark);
  };

  View.prototype.setupBoard = function () {
    var $container = this.$gameContainer;
    for (var i=0; i< 3; i++) {
      $('<div>').addClass('row').appendTo($container);
      for (var j = 0; j < 3; j++){
        var $lastRow = $container.children().last();
        $('<div>').addClass('square unplayed').appendTo($lastRow);
        var $square = $lastRow.children().last();
        $square.data("pos", [i,j]);
      }
    }
  };
})();
