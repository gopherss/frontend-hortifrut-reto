import { Toaster } from "react-hot-toast";
import "./App.css";
import ButtonPokemon from "./components/ButtonPokemon";
import CardPokemon from "./components/CardPokemon";
import InputPokemon from "./components/InputPokemon";
import useSearchPokemon from "./hooks/useSearchPokemon";
import { extractIdFromUrl } from "./utils/lib";

function App() {
  const {
    pokemons,
    pokemon,
    search,
    loading,
    offset,
    limit,
    setOffset,
    setSearch,
  } = useSearchPokemon();

  return (
    <>
      <h1>pokeapi</h1>
      <InputPokemon
        placeholder="Busca tu Pokémon Favorito"
        value={search}
        onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
      />

      {loading && <p>Cargando...</p>}

      <div className="pokemon-grid">
        {pokemon && (
          <CardPokemon
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            weight={pokemon.weight}
          />
        )}

        {pokemons.map((p) => (
          <CardPokemon
            key={p.name}
            name={p.name}
            image={`${import.meta.env.VITE_URI_IMAGES}${extractIdFromUrl(p.url)}.png`}
          />
        ))}
      </div>

      {pokemons.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <ButtonPokemon
            className="btn-pokemon"
            onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
            disabled={offset === 0}
            label="Anterior"
          />

          <ButtonPokemon
            className="btn-pokemon"
            onClick={() => setOffset((prev) => prev + limit)}
            style={{ marginLeft: "10px" }}
            label="Siguiente"
          />
        </div>
      )}

      <Toaster />
    </>
  );
}

export default App;
