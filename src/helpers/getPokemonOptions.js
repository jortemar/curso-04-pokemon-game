// La exportación de la 1ª y 3ª función la realizamos para la
// realización de pruebas. Otra opción hubiera sido trabajar
// únicamente con la función que se exporta por defecto, 
// ya que se comunica con las otras dos

import pokemonApi from "../api/pokemonApi";

export const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));
  // El .map te obliga a introducir argumento en el primer parámetro.
  // Como no nos interesa podemos poner un guión bajo.
  // El valor que nos interesa es el index, que es siempre el segundo parámetro
  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  // El .sort va comparando por pares. En función de si devuelve un valor negativo
  // o positivo, se decide qué elemento se coloca delante del otro.
  // Es como un switch que se coloca sobre los dos primeros elementos del array,
  // y que va recorriendo el mismo, girando unos pares sí y otros no,
  // y generando el orden aleatorio que deseamos
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  return pokemons;
};

// El parámetro de entrada está desesctructurizado,
// cogiendo así los cuatro primeros elementos del array.
export const getPokemonNames = async ([a, b, c, d] = []) => {
  // const resp = await pokemonApi.get(`/3`)
  // console.log(resp.data.name, resp.data.id)
  // console.log(a, b, c, d);

  // aquí solo generamos el array, no realizamos las peticiones
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  // Aquí se están realizando las peticiones, una tras otra
  // Esperamos la respuesta de una petición antes de ejecutar la siguiente
  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  // se genera un array con cuatro objetos con los datos deseados, y se devuelven
  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonOptions;