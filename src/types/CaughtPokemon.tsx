import { type Pokemon } from "pokenode-ts";

export interface CaughtPokemon {
  species: string;
  nickname?: string;
  gender?: string;
  gameOrigin?: string;
  dateCaught?: Date;
}