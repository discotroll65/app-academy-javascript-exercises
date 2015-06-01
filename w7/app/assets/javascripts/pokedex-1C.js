Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var newPokemon = new Pokedex.Models.Pokemon(attrs);
  var that = this;
  newPokemon.save({}, {
    success: function () {
      that.pokes.add(newPokemon);
      that.addPokemonToList(newPokemon);

      if(typeof callback === 'function') {
        callback(newPokemon);
      }
    }
  });
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var formData = $(event.target).serializeJSON();
  this.createPokemon(formData.pokemon, this.renderPokemonDetail.bind(this));
};
