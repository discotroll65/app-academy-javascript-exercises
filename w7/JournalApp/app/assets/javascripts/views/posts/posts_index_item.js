JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  events: {
    "click button.delete": "deletePost"
  },

  tagName: "li",

  deletePost: function(event) {
    this.model.destroy();
  },

  render: function(){

    var post = this.model;
    var content = this.template({post: post});
    this.$el.html(content);

    return this;
  }
});
