<template>
  <div class="options-container">
    <ul>
      <!-- Cuando hacemos click queremos ejecutar un método que esta en PokemonPicture. 
      Se lo mandamos al componente deseado usando '$emit', con un nombre clave (en este caso 'selection'),
      que utilizaremos para invocar el evento en PokemonPage. Sí sería un parámetro 'pokemon.id', el
      único en este caso, que recogeremos para utilizarlo como primer argumento  -->
      <li v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="$emit('selectionPokemon',
          pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  },
  methods: {
    hola() {

    }
  }
}
</script>

<style>
ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>