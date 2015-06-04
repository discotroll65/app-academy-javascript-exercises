JournalApp.Views.ShowPost = Backbone.View.extend({
  template: JST['posts/show'],
  titleEdit: JST["posts/fancyTitleEdit"],
  bodyEdit: JST["poasts/fancyBodyEdit"],

  events: {
    "click button.delete": "deletePost",
    "dblclick .post-body": "editBody",
    "dblclick .post-title": "editTitle",
    "submit form": 'updateAttr',
    "blur .post-title-edit": "updateAttr",
    "blur .post-body-edit": "updateAttr"
  },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  editBody: function() {
    var content = this.bodyEdit({ post: this.model });
    this.$(".post-body").html(content);
  },

  editTitle: function() {
    var content = this.titleEdit({ post: this.model });
    this.$(".post-title").html(content);
  },

  updateAttr: function(event) {
    var view = this;
    event.preventDefault();
    var form = $(event.currentTarget);
    var formData = form.serializeJSON()["post"];
    this.model.save(formData,{
      success: function(){
        view.render();
      },
      error: function(model, resp){
        view.$('.errors').html(resp.responseText);
      }
    })
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
