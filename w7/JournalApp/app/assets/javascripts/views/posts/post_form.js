JournalApp.Views.PostForm = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["posts/post_form"],
  events: {
    "submit form" : "savePost"
  },

  render: function() {
    var content = this.template({ post: this.model });
    this.$el.html(content);

    return this;
  },

  savePost: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget);
    var formData = $target.serializeJSON()["post"];
    var form = this;

    var post = this.model;
    post.save( formData , {
      success: function (){
        Backbone.history.navigate('#/posts/' + post.id, { trigger: true } );
      },
      error: function(model, resp, options) {
        form.$('content.errors').html(resp.responseText);
      }
    });
  }

});
