TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch();

    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    'b' : 'boardsIndex',
    'boards/:id' : 'showBoard'
  },

  boardsIndex: function(){
    var view = new TrelloClone.Views.BoardsIndex({
      collection: this.boards
    });
    this._swapView(view);
  },

  showBoard: function(id){
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({
      model: board
    });
    this._swapView(view);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
