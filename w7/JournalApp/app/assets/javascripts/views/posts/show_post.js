JournalApp.Views.ShowPost = Backbone.View.extend({
  template: JST['posts/show'],
  events: {
    "click button.delete": "deletePost"
  },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  deletePost: function(event) {
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true });
  },

  render: function (){
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  }

});
