JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function() {
    this.listenTo(this.collection, "remove reset add change:title", this.render);
  },

  render: function() {
    var posts = this.collection;
    var content = this.template();
    this.$el.html(content);
    posts.each(function(post) {
      var postItemView = new JournalApp.Views.PostsIndexItem({
        model: post
      });
      this.$('ul').append(postItemView.render().$el);
    }.bind(this));

    return this;
  }
});
