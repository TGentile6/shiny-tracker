import { type Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatName } from "~/utils/formatName";

interface ShinyPokemonProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon | null) => void;
}

export function ShinyPokemon({ pokemon, onClick }: ShinyPokemonProps) {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(pokemon);

  useEffect(() => {
    setCurrentPokemon(pokemon);
  }, [pokemon]);

  const handleClick = () => {
    onClick(currentPokemon);
  };


  return (
    <div className="rounded-xl xs:w-36 sm:w-64 shrink-0 items-center justify-end flex max-w-xs shadow flex-col p-4 ring-1 ring-slate-900/10 cursor-pointer aspect-square bg-white/15 
      hover:bg-white/25 hover:shadow-lg hover:scale-110 transition-all duration-150"
      onMouseDown={handleClick}
      >
      <Image
        src={currentPokemon?.sprites.front_shiny ?? ``}
        alt={currentPokemon?.name ?? `N/A`}
        unoptimized={true}
        width={192}
        height={192}
        draggable="false"
        className="rounded-xl"
        style={{ imageRendering: `pixelated` }}
      />
      <h3 className="text-2xl font-bold shrink text-white">
        {currentPokemon ? formatName(currentPokemon.name) : `Loading...`}
      </h3>
    </div>
  );
}