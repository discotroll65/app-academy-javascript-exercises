window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new JournalApp.Routers.Posts({
      $main: $('#main')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
