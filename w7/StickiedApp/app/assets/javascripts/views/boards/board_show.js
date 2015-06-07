TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.lists = this.model.lists();

  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
