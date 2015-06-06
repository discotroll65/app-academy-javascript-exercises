TrelloClone.Views.BoardItem = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .delete-board": "deleteBoard"
  },

  tagName: 'li',
  className: 'board-item',

  template: JST['boards/item'],

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  },

  deleteBoard: function(){
    this.remove();
    this.model.destroy();
  }


});
