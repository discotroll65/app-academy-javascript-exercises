TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addBoardItemView);
    this.listenTo(this.collection, 'sync add', this.render);
  },

  addBoardItemView: function(board){
    var view = new TrelloClone.Views.BoardItem({
      model: board
    });

    this.addSubview('ul', view);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
