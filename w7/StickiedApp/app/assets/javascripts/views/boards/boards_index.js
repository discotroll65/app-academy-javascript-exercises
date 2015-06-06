TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addBoardItemView);
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    "click div.new-board-block" : "checkFormClicked"
  },

  addBoardItemView: function(board){
    var view = new TrelloClone.Views.BoardItem({
      model: board
    });

    this.addSubview('ul', view);
  },

  checkFormClicked: function(event){
    if(typeof this._addForm === "undefined"){
      this._addForm = true;
    }

    if (this._addForm ){
      this.addBoardFormView();
      this._addForm = false;
    } else if($(event.target).attr("class") === 'new-board-block') {
      this.subviews('.new-board-block').each(
        this.removeSubview.bind(this, '.new-board-block')
      );
      this._addForm = true;
    }
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
