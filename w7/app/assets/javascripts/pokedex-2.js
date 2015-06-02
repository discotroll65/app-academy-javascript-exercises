Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $crap = $('<pre>').append(
    "name: " + toy.get("name") + "\n" +
    "happiness: " + toy.get("happiness") + "\n" +
    "price: " + toy.get("price")
  );
  var $toyLi = $('<li>').append($crap).addClass('toy-list-item');
  $toyLi.data('toy-id', toy.id);
  $toyLi.data('pokemon-id', toy.get('pokemon_id'));
  this.$el.find('ul.toys').append($toyLi);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $detailStuff = $('<div>').addClass('detail');
  $detailStuff.append($('<img>').attr('src', toy.get('image_url')));
  this.$toyDetail.html($detailStuff);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var that = this;
  var pokemon = new Pokedex.Models.Pokemon({
    id: $(event.currentTarget).data('pokemon-id')
    })
  pokemon.fetch({
    success: function(){
      var toy = pokemon.toys().get($(event.currentTarget).data("toy-id"));
      that.renderToyDetail(toy);
    }
  });

};
