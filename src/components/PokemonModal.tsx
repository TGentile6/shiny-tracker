import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { type Pokemon } from "pokenode-ts"
import { useEffect, useState } from "react"
import { formatName } from "~/utils/formatName";
import Image from "next/image";
import { get } from "node_modules/axios/index.cjs";

interface PokemonModalProps {
  pokemon?: Pokemon;
  open: boolean;
  setOpen: (open: boolean) => void;
  getSpeciesData: (species: string) => Promise<Pokemon>;
}

export function PokemonModal({ pokemon, open, setOpen, getSpeciesData }: PokemonModalProps) {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | undefined>(pokemon);
  const [speciesData, setSpeciesData] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setCurrentPokemon(pokemon);
      setSpeciesData(await getSpeciesData(pokemon?.species.name ?? ""));
    };
  
    void fetchData();
  }, [pokemon, getSpeciesData]);

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);


  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-black bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-5xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-[#474b61] border-4 border-[#ffcf66] rounded-2xl px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-4">
              <button
                type="button"
                onMouseDown={() => setOpen(false)}
                className="absolute right-4 top-4 text-white/50 hover:text-white/80 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span >Close</span>
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-3 overflow-hidden sm:col-span-4 md:col-span-5">
                  <Image
                    src={speciesData?.sprites?.front_shiny ?? ``}
                    alt={speciesData?.name ?? `N/A`}
                    unoptimized={true}
                    width={480}
                    height={480}
                    draggable="false"
                    className="rounded-xl"
                    style={{ imageRendering: `pixelated` }}
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-5xl font-bold text-white sm:pr-12">{speciesData ? formatName(speciesData.name) : ``}</h2>

                    <p className="text-2xl text-black/80">{speciesData ? formatName(speciesData.name) : ``}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <div className="flex items-center">
                        <div className="flex items-center">
                        </div>
                        <p>{speciesData?.types[0]?.type.name}</p>
                      </div>
                    </div>
                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      {/* Colors */}
                      <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-gray-900">Color</legend>
                      </fieldset>

                      {/* Sizes */}
                      <fieldset aria-label="Choose a size" className="mt-10">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">Size</div>
                          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Size guide
                          </a>
                        </div>
                      </fieldset>

                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </div>
  )
}