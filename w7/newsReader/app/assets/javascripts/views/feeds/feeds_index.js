NewsReader.Views.FeedsIndex = Backbone.CompositeView.extend({

  template: JST['feeds/index'],

  initialize: function () {
    //below same as this.collection.each(this.addFeedView, this)

    this.collection.each(this.addFeedView.bind(this))
    this.listenTo(this.collection, 'add', this.addFeedView);
  },

  render: function () {
    this.checkFeeds()
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addFeedView: function(feed){
    var feedItem = new NewsReader.Views.FeedItem({model: feed});
    this.addSubview('ul', feedItem);
  },

  checkFeeds: function () {

  }





});
