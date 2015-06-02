Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var that = this;
  pokemon.fetch({
    success: function() {
      pokemon.toys().each(function(toy){
        that.addToyToList(toy);
      });
    }
  });
  var pokeEntry = $('<div>').addClass('detail');
  var movesTitle = $('<h2>').append("Moves");
  var movesList = $('<ul>');
  var pokeName = $('<h1>').append( pokemon.get('name') )
  pokeEntry.append($('<img>').attr('src', pokemon.get('image_url') ) );
  pokeEntry.append( pokeName );
  pokeEntry.append($('<br>'));

  for (var attr in pokemon.attributes){
    if ( attr === "id" || attr === "name" || attr === "image_url") {
    } else if (attr === "moves"){
      movesList.append(movesTitle);

      $(pokemon.get("moves")).each(function(idx, move){
        movesList.append($('<li>').text(move));
      });
      pokeEntry.append(movesList);
    } else {
      pokeEntry.append( attr + ': ' + pokemon.get(attr))
      pokeEntry.append($('<br>'));
    }
  }

  pokeEntry.append($('<ul>').addClass('toys'))

  this.$pokeDetail.html(pokeEntry);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var id = $(event.currentTarget).data("id");
  var foundPokemon = this.pokes.get(id);
  this.renderPokemonDetail(foundPokemon);
};
