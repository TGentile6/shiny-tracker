import Head from "next/head";
import { PokemonTile, PokemonModal} from "~/components";
import {type Pokemon, PokemonClient} from "pokenode-ts";
import { useEffect, useState } from "react";
import { type CaughtPokemon } from "~/types/CaughtPokemon";

export default function Home() {

  const pokeAPI = new PokemonClient();
  const [caughtPokemonList, setCaughtPokemonList] = useState<CaughtPokemon[] | null>([
    {
      species: "charizard",
    },
    {
      species: "pikachu",
    },
    {
      species: "bulbasaur",
      nickname: "Leaves"
    },
    {
      species: "guzzlord",
      nickname: "HJMuzzlord",
    },
  ]);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [modalPokemon, setModalPokemon] = useState<CaughtPokemon | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fetchPokemon = async (species: string) => {
    const pokemon = await pokeAPI.getPokemonByName(species)
    // .catch(err => {
    //   console.error(err);
    //   return new;
    // });
    return pokemon;
  };

  useEffect(() => {
    const fetchSpeciesData = async () => {
      const speciesData = await Promise.all(
        caughtPokemonList?.map(async (caught) => {
          const species = await fetchPokemon(caught.species);
          return species;
        }) ?? [] 
      );
      setPokemonData(speciesData);
    };

    void fetchSpeciesData();
  }, [caughtPokemonList]);

  const getSpeciesData = async (species: string) => {
    const pokemon = await fetchPokemon(species);
    return pokemon;
  }

  const handleClickMon = (mon: CaughtPokemon) => {
    if (mon) {
      setModalPokemon(mon);
      setModalOpen(true);
    }
  };

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
              {caughtPokemonList?.map((caught) => (
                <PokemonTile 
                  key={caughtPokemonList?.indexOf(caught)} 
                  caught={caught}
                  onClick={(mon) => mon && handleClickMon(mon)}
                  getSpeciesData={getSpeciesData}
                />
              ))}
            </div>
          {/* <PokemonModal pokemon={modalPokemon} open={modalOpen} setOpen={setModalOpen} getSpeciesData={getSpeciesData}/> */}
        </div>
      </main>
    </>
  );
}
