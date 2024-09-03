import Head from "next/head";
import { ShinyPokemon, PokemonModal} from "~/components";
import {type Pokemon, PokemonClient} from "pokenode-ts";
import { useEffect, useState } from "react";

export default function Home() {

  const pokeAPI = new PokemonClient();
  const [pokemonNames, setPokemonNames] = useState<string[]>(["charizard", "pikachu", "bulbasaur", "guzzlord", ]);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [modalPokemon, setModalPokemon] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const fetchPokemon = async () => {
      const fetchedPokemon = await Promise.all(
        pokemonNames.map(async (name) => {
          const pokemon = await pokeAPI.getPokemonByName(name)
          // .catch(err => {
          //   console.error(err);
          //   return new;
          // });
          return pokemon;
        })
      );
      setPokemonData(fetchedPokemon);
    };

    void fetchPokemon();
  }, [pokemonNames]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickMon = (mon: Pokemon) => {
    if (mon) {
      console.log(mon)
      setModalPokemon(mon);
      console.log(modalPokemon)
    }
  }

  useEffect(() => {
    console.log(modalPokemon)
  }, [modalPokemon])

  return (
    <>
      <Head>
        <title>Simple Shiny Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#353a57] to-[#2a2e45]">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-6">
          <h1 className="text-3xl font-extrabold cursor-default tracking-tight drop-shadow whitespace-nowrap text-white md:text-[3rem] hover:scale-105 transition-transform duration-150">
            Simple <span className="text-[#ffcf66]">Shiny</span> Tracker
          </h1>
            <div className="flex flex-wrap justify-start gap-6 max-w-screen-lg mx-auto p-4">
              {pokemonData.map((pokemon) => (
                <ShinyPokemon 
                  key={pokemonData.indexOf(pokemon)} 
                  pokemon={pokemon}
                  onClick={(mon) => mon && handleClickMon(mon)}
                />
              ))}
            </div>
          <PokemonModal pokemon={modalPokemon}/>
        </div>
      </main>
    </>
  );
}
