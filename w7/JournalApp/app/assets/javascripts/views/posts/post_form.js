JournalApp.Views.PostForm = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["posts/post_form"],
  events: {
    "submit form" : "savePost"
  },

  render: function() {
    var options = { post: this.model };
    var buttonMessage = (options.post.id) ? "Update Post" : "Create Post";
    _(options).extend({buttonMessage: buttonMessage});

    var content = this.template(options);
    this.$el.html(content);

    return this;
  },

  savePost: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget);
    var formData = $target.serializeJSON()["post"];
    var form = this;

    var post = this.model;
    post.save(formData, {
      success: function (){
        form.collection.add(post);
        Backbone.history.navigate('#/posts/' + post.id, { trigger: true } );
      },
      error: function(model, resp, options) {
        form.$('content.errors').html(resp.responseText);
      },
      wait: true
    });
  }

});
