NewsReader.Views.FeedItem = Backbone.CompositeView.extend({
  template: JST['feeds/index_item'],

  tagName: 'li',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template( { feed: this.model } );
    this.$el.html(content);
    return this;
  }

});
