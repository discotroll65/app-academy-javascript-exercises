TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',

  model: TrelloClone.Models.Board,

  getOrFetch: function(id){
    var board = this.get(id);
    if (board){
      board.fetch();
    } else {
      var boardsCollection = this;
      board = new TrelloClone.Models.Board({id: id});
      board.fetch({
        success: function(){
          boardsCollection.add(board);
        }
      });
    }

    return board;
  }
});
