Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    'submit form': 'savePokemon'
  },

  render: function () {
    var pokemonForm = JST["pokemonForm"]();
    this.$el.html(pokemonForm);
    return this;
  },

  savePokemon: function (event) {
    var view = this;
    event.preventDefault();
    var pokeAttrs = ($(event.currentTarget).serializeJSON())['pokemon'];
    view.model.save(pokeAttrs, {
      success: function () {
        view.collection.add(view.model);
        Backbone.history.navigate('pokemon/' + view.model.id, { trigger: true });
      }
    });


  }
});
