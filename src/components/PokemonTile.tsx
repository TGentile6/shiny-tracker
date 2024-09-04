import { type Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatName } from "~/utils/formatName";
import { type CaughtPokemon } from "~/types/CaughtPokemon";

interface ShinyPokemonProps {
  caught: CaughtPokemon;
  onClick: (pokemon: Pokemon | null) => void;
  getSpeciesData: (species: string) => Promise<Pokemon>;
}

export function PokemonTile({ caught, onClick, getSpeciesData }: ShinyPokemonProps) {
  const [currentCaught, setCurrentCaught] = useState<CaughtPokemon | null>(caught);
  const [currentSpecies, setCurrentSpecies] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setCurrentCaught(caught);
      setCurrentSpecies(await getSpeciesData(caught.species));
    };
  
    void fetchData();
  }, [caught, getSpeciesData]);

  const handleClick = () => {
    onClick(caught);
  };


  return (
    <div className="rounded-xl xs:w-36 sm:w-64 shrink-0 items-center justify-end flex max-w-xs shadow flex-col p-4 ring-1 ring-slate-900/10 cursor-pointer aspect-square bg-white/15 
      hover:bg-white/25 hover:shadow-lg hover:scale-110 transition-all duration-150"
      onMouseDown={handleClick}
      >
      <Image
        src={currentSpecies?.sprites.front_shiny ?? ``}
        alt={currentSpecies?.name ?? `N/A`}
        unoptimized={true}
        width={192}
        height={192}
        draggable="false"
        className="rounded-xl"
        style={{ imageRendering: `pixelated` }}
      />
      <h3 className="text-2xl font-bold shrink text-white">
        {currentSpecies ? formatName(currentSpecies.name) : `Loading...`}
      </h3>
    </div>
  );
}