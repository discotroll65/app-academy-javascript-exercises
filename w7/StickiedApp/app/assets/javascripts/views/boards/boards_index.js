TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeBoardItemView);
    this.listenTo(this.collection, 'add', this.addBoardItemView);

    this.collection.each(this.addBoardItemView.bind(this));

  },

  className: 'index-div',

  events: {
    "click div.new-board-block" : "checkFormClicked",
    "submit" : "killFormView"
  },

  addBoardItemView: function(board){
    var view = new TrelloClone.Views.BoardItem({
      model: board
    });

    this.addSubview('span.boards', view);
  },

  removeBoardItemView: function(board){
    this.removeModelSubview('span.boards', board);
  },

  checkFormClicked: function(event){
    if(typeof this._addForm === "undefined"){
      this._addForm = true;
    }

    var formNotClicked = ($(event.target).attr("class") === 'new-board-block');

    if (this._addForm && formNotClicked ){
      this.addBoardFormView();
      this._addForm = false;
    } else if(formNotClicked) {
      this.killFormView.call(this);
      this._addForm = true;
    }
  },

  killFormView: function(){
    this.subviews('.new-board-block').each(
      this.removeSubview.bind(this, '.new-board-block')
    );
    this._addForm = true;
  },

  addBoardFormView: function(){
    var board = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.BoardForm({
      model: board,
      collection: this.collection
    });

    this.addSubview('.new-board-block', view);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
