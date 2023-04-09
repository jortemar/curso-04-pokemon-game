import { shallowMount } from "@vue/test-utils"
import PokemonOptions from "@/components/PokemonOptions"

import { pokemons } from "../mocks/pokemons.mock"

describe("PokemonOptions component", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: pokemons
      },
    })
  })

  test("debe hacer match con el snapshot", () => {
    //console.log(wrapper.html());

    expect(wrapper.html()).toMatchSnapshot()

    //toMatchInlineSnapshot() genera automáticamente
    //el código en un template html dentro de la función 
    // 
    /*
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="options-container">
        <ul>
          <!-- Cuando hacemos click queremos ejecutar un método que esta en PokemonPicture. 
            Se lo mandamos al componente deseado usando '$emit', con un nombre clave (en este caso 'selection'),
            que utilizaremos para invocar el evento en PokemonPicture. Sí sería un parámetro 'pokemon.id', el
            único en este caso, que recogeremos para utilizarlo como primer argumento  -->
          <li>pikachu</li>
          <li>charmander</li>
          <li>venusaur</li>
          <li>mew</li>
        </ul>
      </div>
    `);
    */
  })

  test('debe mostrar las 4 opciones correctamente', () => {

    // que existan 4 li
    // cada li debe tener su nombre de pokemon
    const liTags = wrapper.findAll('li')
    expect(liTags.length).toBe(4)

    expect(liTags[0].text()).toBe('pikachu')
    expect(liTags[1].text()).toBe('charmander')
    expect(liTags[2].text()).toBe('venusaur')
    expect(liTags[3].text()).toBe('mew')
    
  })

  test('debe emitir "selection" con sus respectivos parámetros al hacer click', () => {

    const [li1, li2, li3, li4] = wrapper.findAll('li')

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')

    console.log(wrapper.emitted('selectionPokemon'))
    expect(wrapper.emitted('selectionPokemon').length).toBe(4)
    // Cambiamos el .toBe por un .toEqual
    // El motivo es que [] !== []
    expect(wrapper.emitted('selectionPokemon')[0]).toEqual([5])
    expect(wrapper.emitted('selectionPokemon')[1]).toEqual([10])
    expect(wrapper.emitted('selectionPokemon')[2]).toEqual([15])
    expect(wrapper.emitted('selectionPokemon')[3]).toEqual([20])
    
  })

})
