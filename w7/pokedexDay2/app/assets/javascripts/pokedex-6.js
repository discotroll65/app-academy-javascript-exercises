Pokedex.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail',
    'pokemon/:id': 'pokemonDetail'
  },

  pokemonDetail: function (id, callback) {
    console.log("pokemonDetailing!");

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
      pokemonDetail.refreshPokemon({success: callback} );
      this._pokemonDetail = pokemonDetail;
    }
  },

  pokemonIndex: function (callback) {
    console.log("Indexing!");
    var router = this;
    var pokes = new Pokedex.Collections.Pokemon();

    router._pokemonIndex = new Pokedex.Views.PokemonIndex({
      collection: pokes
    });
    $("#pokedex .pokemon-list").html(router._pokemonIndex.$el);
    router._pokemonIndex.refreshPokemon( {success: callback} );
    router.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    console.log("toyDetailing!");

    if (!this._pokemonDetail){
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      console.log('' + toy);
      var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });

      $('#pokedex .toy-detail').html(toyDetail.render().$el);
    }
  },

  pokemonForm: function () {
    console.log("forming!");

    var router = this;
    var pokemonForm = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: router._pokemonIndex.collection
    });

    $('#pokedex .pokemon-form').html(pokemonForm.render().$el);
  }

});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
