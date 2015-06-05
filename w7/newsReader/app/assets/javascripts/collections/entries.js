NewsReader.Collections.Entries = Backbone.Collection.extend({
  url: function () {
    return this.feed.url() + '/entries'
  },

  model: NewsReader.Models.Entry,

  initialize: function (arr, options) {
    this.feed = options.feed;
  }

});
