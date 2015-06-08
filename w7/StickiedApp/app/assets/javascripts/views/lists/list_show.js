TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  initialize: function(){
    this.cards = this.model.cards();
    this.listenTo(this.cards, 'sync add', this.addCardShowView);
    this.cards.each(this.addCardShowView.bind(this));
  },

  tagName: 'li',

  className: 'list',

  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCardShowView: function(card){
    var view = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview('ul.list-cards', view);
  }
});
