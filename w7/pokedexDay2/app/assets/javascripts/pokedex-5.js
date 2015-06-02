Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  addPokemonToList: function (pokemon) {
    var pokemonListItem = JST['pokemonListItem']({ pokemon: pokemon });
    this.$el.append(pokemonListItem);
  },

  refreshPokemon: function (options) {
    this.collection.fetch(options)
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    Backbone.history.navigate('pokemon/' + $target.data('id'), {trigger: true});


  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click .toys li': 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    var view = this;
    view.model.fetch({
      success: function () {
        view.render();
        options.success && options.success();
      }
    });
  },

  render: function () {
    var view = this;
    view.$el.empty();
    var pokemonDetail = JST['pokemonDetail']({pokemon: view.model});
    view.$el.html(pokemonDetail);

    view.model.toys().each(function (toy){
      var toyListItem = JST['toyListItem']({  toy: toy });
      view.$el.find('ul.toys').append(toyListItem);
    });

    return view;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokemonId = $target.data("pokemon-id");
    var toyId = $target.data("id");
    Backbone.history.navigate(
      'pokemon/' + pokemonId + '/toys/' + toyId,
      { trigger: true }
    );


    // var toyId = $target.data('id');
    // var toy = this.model.toys().get(toyId);
    // var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    //
    // $('#pokedex .toy-detail').append(toyDetail.render().$el);
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var toyDetail = JST["toyDetail"]({
      toy: this.model,
      pokes: new Pokedex.Collections.Pokemon()
    });
    this.$el.html(toyDetail);
    return this;
  }
});
