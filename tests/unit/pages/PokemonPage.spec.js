import {shallowMount, mount} from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {
    let wrapper
    let mixPokemonArraySpy

    beforeEach(() => {
        //mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')

        wrapper = shallowMount(PokemonPage)
    })

    test('debe hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe llamar mixPokemonArray al montar', () => {
        // no funciona porque cuando el evento se lanza al montarse la página, ya es
        // demasiado tarde para espiar el evento. Hay que ponerlo arriba, antes del wrapper
        // const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')

        // Otra opción sería retrasar el montaje del wrapper, invocándolo nuevamente dentro del test

        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        // no necesitamos asignarle variable
        shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()

    })

    // podemos evitarnos esos problemas utilizando este test  (SNAPSHOT CON DATA Y SUBS)
    test('debe hacer match con el snapshot cuando cargan los pokemons', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    // podemos usar mount o shallowMount para montar el wrapper
    // la diferencia es que shallowMount solo simula el montaje
    // de los componentes, mientras que el mount sí es un montaje real
    // y realizará el ciclo de vida de todos los componentes

    test('debe mostrar los componentes de PokemonPictur y PokemonOptions', () => {

        // Pokemon Picture y Pokemon Options deben existir
        // Pokemon Picture attribute pokemonid === 5
        // Pokemon Options attribute pokemons.toBe(true)

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        // La simulación del montaje del componente da lugar a una
        // etiqueta con el nombre del componente, seguido de 'stub'
        expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
        expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy()

        expect(wrapper.find(`pokemon-picture-stub`).attributes(`pokemonid`)).toBe('5')
        expect(wrapper.find(`pokemon-options-stub`).attributes(`pokemons`)).toBeTruthy()

    })

    // PROBAR LAS PROPIEDADES REACTIVAS DEL COMPONENTE
    test('pruebas con checkAnswer', async() => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        // con .vm accedemos a los métodos del componente montado
        // console.log(wrapper.vm)

        await wrapper.vm.checkAnswer(5)

        expect(wrapper.find('h2').exists()).toBeTruthy()
        //console.log(wrapper.find('h2').text())
        expect(wrapper.vm.showPokemon).toBe(true)
        // dos formas distintas de hacer la misma comprobación
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)
        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)

        // Cuando hacemos una modificación en alguna de las propiedades
        // reactivas, y estamos esperando que esas propiedades realicen
        // alguna modificación en el DOM, tenemos que esperar que se monte
        // la estructura (re-renderización de componentes).
        // Así que habrá que usar 'async' y 'await'

    })




})