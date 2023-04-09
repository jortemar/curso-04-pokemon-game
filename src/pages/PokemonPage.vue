<template>
  <h1 v-if="!pokemon"> Espere por favor... </h1>

  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <!-- Podemos escribir los atributos de esta forma (pokemon-id
    en lugar de pokemonId) y todo seguiría funcionando igual -->
    <PokemonPicture 
        :pokemon-id="pokemon.id" 
        :show-pokemon="showPokemon" />
    <!-- Aquí recogemos el selection que hemos hecho en PokemonOptions, con el fin de ejecutar 'checkAnswer'
    No es necesario poner paréntesis en la llamada para recoger el parámetro, que está definido en 'checkAnswer' -->
    <PokemonOptions
        :pokemons="pokemonArr"
        @selectionPokemon="checkAnswer" />

    <!-- Necesitamos agrupar h2 y button, pero no necesitamos el div. Si usamos la etiqueta template,
    esta cumplirá la función del div pero no se generará cuando se cree la estructura html -->
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        Nuevo juego
      </button>
    </template>
    
  </div>
</template>

<script>
  import PokemonOptions from '@/components/PokemonOptions'
  import PokemonPicture from '@/components/PokemonPicture'

  import getPokemonOptions from '@/helpers/getPokemonOptions'

  export default {

      components: {PokemonOptions, PokemonPicture},
      // la data es un método que tiene que devolver un objeto
      data() {
        return {
          pokemonArr: [],
          pokemon: null,
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      },
      methods: {
        async mixPokemonArray() {
          // la función asignada es una promesa. Así que el método también puede ser asíncrono
          this.pokemonArr = await getPokemonOptions()

          const rndInt = Math.floor(Math.random() * 4)
          this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
          
          this.showPokemon = true
          this.showAnswer = true
          
          if (selectedId === this.pokemon.id) {
            this.message = `Correcto, ${this.pokemon.name}`
          } else {
            this.message = `Oops, era ${this.pokemon.name}`
          }
        },
        newGame() {
          this.showPokemon = false
          this.showAnswer = false
          this.pokemonArr = []
          this.pokemon = null
          this.mixPokemonArray()
        }
      },
      mounted() {
        this.mixPokemonArray()      
      }

  }
</script>