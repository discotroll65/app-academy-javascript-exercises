TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  tagName: 'li',

  className: 'card',

  render: function(){
    var content = this.template({card: this.model});
    this.$el.html(content);
    return this;
  }
});
