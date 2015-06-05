NewsReader.Views.FeedDetail = Backbone.CompositeView.extend({
  template: JST['feeds/show'],

  initialize: function(){
    //below same as this.model.entries().each(this.addEntryView, this)

    this.model.entries().each(this.addEntryView.bind(this));
    this.listenTo(this.model.entries(), 'add', this.addEntryView);
  },

  events: {
    "click button" : "instantRefresh"
  },

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  instantRefresh: function(event){
    var feedId = this.model.id;
    $.ajax({
      context: this,
      url: ("api/feeds/" + feedId + "?force_reload=true"),
      dataType: 'json',
      success: function (response) {
        var feed = this.model;
        var instantEntriesArray = response.instant_entries;
        var refreshedEntries = new NewsReader.Collections.Entries(
          instantEntriesArray, {feed: feed}
        );
        _(feed._entries).extend(refreshedEntries);
      }
    });
    this.model.fetch({
      success: (function(){
        Backbone.history.navigate( '#/feeds/' + this.model.id  );
      }).bind(this)
    });
  },

  addEntryView: function (entry) {
    var entryShow = new NewsReader.Views.EntryDetail({model: entry});
    this.addSubview('ul', entryShow);
  }
});
