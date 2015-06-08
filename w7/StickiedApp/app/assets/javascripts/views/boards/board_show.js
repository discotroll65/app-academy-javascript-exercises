TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.lists = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.lists, 'add', this.addListShowView);
    this.lists.each(this.addListShowView.bind(this));

  },

  addListShowView: function(list){
    var view = new TrelloClone.Views.ListShow({
      model: list
    });

    this.addSubview('ul.board-lists', view);
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
