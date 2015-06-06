TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.boards = new TrelloClone.Collections.Boards();
    this.boards.fetch();

    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    'fack' : 'test'
  },

  boardsIndex: function(){
    alert('hi');
    console.log("indexing");
    var view = new TrelloClone.Views.BoardsIndex({
      collection: this.boards
    });
    this._swapView(view);
  },

  test: function(){
    alert("god damn it");
    console.log("testing test function");
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
