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
    event.preventDefault();
    attrs = this.$el.serializeJSON();

    board.save(attrs, {
      success: function( ){
        Backbone.history.navigate("fack");
        form.collection.add(board);
      }
    });

  }

});
