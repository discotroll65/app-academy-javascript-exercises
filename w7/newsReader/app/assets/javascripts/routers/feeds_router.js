NewsReader.Routers.Feeds = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.feeds = new NewsReader.Collections.Feeds();
    this.feeds.fetch();
  },

  routes: {
    '' : 'index',
    'feeds/:id' : 'feedShow'
  },

  feedShow: function (id) {
    var feed = this.feeds.getOrFetch(id);
    var view = new NewsReader.Views.FeedDetail({model: feed});

    this._swapView(view);
  },

  index: function(){
    var view = new NewsReader.Views.FeedsIndex({ collection: this.feeds});

    this._swapView(view);

  },

  _swapView: function( view ){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
