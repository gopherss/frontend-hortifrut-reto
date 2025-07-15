import { useCallback, useEffect, useState } from "react";
import { fetchPokemonByName, fetchPokemons } from "../services/pokemon.service";
import debounce from "lodash.debounce";
import type { IPokemons, Result } from "../interfaces/IPokemons";
import type { IPokemon } from "../interfaces/IPokemon";
import toast from "react-hot-toast";
import { getCache, setCache } from "../utils/cache";

const useSearchPokemon = () => {
  const [pokemons, setPokemons] = useState<Result[]>([]);
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 12;

  const loadPokemons = async () => {
    setLoading(true);

    const cacheKey = `pokemons-${limit}-${offset}`;
    const cached = getCache(cacheKey);

    if (cached) {
      setPokemons(cached);
      setPokemon(null);
      setLoading(false);
      return;
    }

    try {
      const data: IPokemons = await fetchPokemons(limit, offset);
      setPokemons(data.results);
      setCache(cacheKey, data.results);
      setPokemon(null);
    } catch (error) {
      console.log("Error cargando pokemons", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.trim() === "") {
        loadPokemons();
        return;
      }

      const cacheKey = `pokemon-${term.toLowerCase()}`;
      const cached = getCache(cacheKey);

      if (cached) {
        setPokemon(cached);
        setPokemons([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data: IPokemon = await fetchPokemonByName(term.toLowerCase());
        setPokemon(data);
        setPokemons([]);
        setCache(cacheKey, data);
      } catch (error) {
        setPokemon(null);
        setPokemons([]);
        toast.error("Pokémon no encontrado");
      } finally {
        setLoading(false);
      }
    }, 500),
    [offset]
  );

  useEffect(() => {
    if (search.trim() === "") {
      loadPokemons();
    } else {
      debouncedSearch(search);
    }
  }, [search, offset]);

  return {
    pokemons,
    pokemon,
    search,
    loading,
    offset,
    limit,
    setOffset,
    setSearch,
  };
};

export default useSearchPokemon;
