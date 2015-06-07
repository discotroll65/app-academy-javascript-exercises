TrelloClone.Views.BoardItem = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .delete-board": "deleteBoard",
    "click .board-item-content" : "showBoard"
  },

  tagName: 'li',
  className: 'board-item',

  template: JST['boards/item'],

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  },


  showBoard: function(){
    Backbone.history.navigate('boards/'+ this.model.id, {trigger: true});
  },

  deleteBoard: function(){
    this.remove();
    this.model.destroy();
  }


});
