Pokedex.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail',
    'pokemon/:id': 'pokemonDetail'
  },

  pokemonDetail: function (id, callback) {
    var router = this;
    if (!this._pokemonIndex || this._pokemonIndex.collection.length === 0) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    } else {
      var pokes = router._pokemonIndex.collection;

      var pokemon = pokes.get(id);
      var pokemonDetail = new Pokedex.Views.PokemonDetail({
        model: pokemon
      });

      $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
      pokemonDetail.refreshPokemon(callback);
      this._pokemonDetail = pokemonDetail;
    }
  },

  pokemonIndex: function (callback) {
    var router = this;
    var pokes = new Pokedex.Collections.Pokemon();

    router._pokemonIndex = new Pokedex.Views.PokemonIndex({
      collection: pokes
    });
    $("#pokedex .pokemon-list").html(router._pokemonIndex.$el);
    router._pokemonIndex.refreshPokemon( {success: callback} );
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail){
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
      var pokemon = this._pokemonDetail.model.fetch()
      var toy = this._pokemonDetail.model.toys().get(toyId);
      console.log('' + toy);
      var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });

      $('#pokedex .toy-detail').html(toyDetail.render().$el);
    }
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
