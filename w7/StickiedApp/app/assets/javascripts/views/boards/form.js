TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/form'],
  tagName: 'form',
  className: 'board-form',
  events:{
    "submit": "submit"
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    var form = this;
    var board = this.model;
    var indexUrl;
    event.preventDefault();
    attrs = this.$el.serializeJSON();

    board.save(attrs, {
      success: function( ){
        form.collection.add(board);

        indexUrl = (
          Backbone.history.getFragment() === ""
        ) ? "b" : "";

        Backbone.history.navigate(
          indexUrl, {trigger: true}
        );
      }
    });

  }

});
