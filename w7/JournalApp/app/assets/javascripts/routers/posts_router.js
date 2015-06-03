JournalApp.Routers.Posts = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    if (!this._posts) {
      this._posts = new JournalApp.Collections.Posts();
    }
  },

  routes: {
    '': 'index',
    'posts/new': 'create',
    'posts/:id': 'show',
    'posts/:id/edit' : 'edit'
  },

  create: function(){
    var post = new JournalApp.Models.Post();
    var view = new JournalApp.Views.PostForm({
      model: post,
      collection: this._posts
    });

    this._swapView(view);
  },

  index: function () {
    this._posts.fetch();

    var view = new JournalApp.Views.PostsIndex({
      collection: this._posts
    });

    this._swapView(view);
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
      model: post
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
