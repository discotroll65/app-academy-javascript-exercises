JournalApp.Routers.Posts = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$main.find('#content');
    if (!this._posts) {
      this._posts = new JournalApp.Collections.Posts();
    }

    var $sidebar = options.$main.find('#sidebar');
    this._renderSidebar($sidebar);
  },

  routes: {
    '': 'root',
    'posts/new': 'new',
    'posts/:id': 'show',
    'posts/:id/edit' : 'edit'
  },

  new: function(){
    var post = new JournalApp.Models.Post();
    var view = new JournalApp.Views.PostForm({
      model: post,
      collection: this._posts
    });

    this._swapView(view);
  },

  root: function(){
    this._currentView && this._currentView.remove();
    this.$rootEl.empty();
  },

  show: function (id) {
    var post = this._posts.getOrFetch(id);
    var view = new JournalApp.Views.ShowPost({
      model: post
    });

    this._swapView(view);
  },

  edit: function(id){
    var post = this._posts.getOrFetch(id);
    var view = new JournalApp.Views.PostForm({
      model: post,
      collection: this._posts
    });

    this._swapView(view);
  },

  _renderSidebar: function ($sidebar) {
    this._posts.fetch();

    var view = new JournalApp.Views.PostsIndex({
      collection: this._posts
    });

    $sidebar.html(view.render().$el);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
