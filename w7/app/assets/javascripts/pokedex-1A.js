Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var pokeItem = $('<li>').addClass('poke-list-item')
    .text( pokemon.get("name") +" "+ pokemon.get("poke_type") );
  this.$pokeList.append(pokeItem);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  var that = this;
  this.pokes.fetch({
    success: function(){
      that.pokes.each(function(pokemon, idx){
        that.addPokemonToList(pokemon);
      });
    }
  });

};
