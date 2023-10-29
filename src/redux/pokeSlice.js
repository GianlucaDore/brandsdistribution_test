import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAsyncPokedex = createAsyncThunk('poke/fetchAsyncPokedex',
    async () =>
    {
        const response = await fetch('https://pokeapi.co/api/v2/pokedex/kanto/', {
            "method" : 'GET',
            "headers" : {}
        }).catch((err) => ("There was an error fetching the Pokédex: " + err));

        if (!response.ok)
        {
            console.log("Response for API Pokédex call is not ok!");
        }

        const pokedexData = await response.json();  // We now collect all 151 Kanto Pokémon species.

        const globalResponse = await Promise.all(pokedexData.pokemon_entries.map(async (e) => await fetch(e.pokemon_species.url)));

        const pokespeciesDetails = await Promise.all(globalResponse.map(pokemon => pokemon.json()));  // Collected all first-gen 151 Pokémon species.

        // Now we'll save each Pokemon's data, aka we'll create our app-Pokédex. Some infos needed aren't provided by the pokemon-species API;
        const pokedexForApp = await Promise.all(pokespeciesDetails.map(async p => 
            {
                /* We need to make a call to the specific Pokémon API to have all the infos of our Pokémons, pokemon-species API does not provide them all. */
                const pokemonDataResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + p.id ).catch((err) => "Error fetching pokémon data for id: " + p.id);
                const pokemonData = await pokemonDataResponse.json();

                /* And to know the evolution tree of each Pokémon, another API is needed: evolution_chain. */
                const evolutionsDataResponse = await fetch(p.evolution_chain.url).catch((err) => "Error fetching pokémon evolutions data for id: " + p.id);
                const evolutionsData = await evolutionsDataResponse.json();
                /* We now proceed to save the evolution tree for the current specie p. */
                let evolutions = []; 
                let currentStep = evolutionsData.chain;
                while (currentStep)  
                {
                    evolutions.push(currentStep.species.name.charAt(0).toUpperCase() + currentStep.species.name.slice(1));
                    currentStep = currentStep.evolves_to[0];
                }

                /* Making the sum of stats calculation in advance: */
                const statSum = pokemonData.stats.reduce((total, stat) => total + stat.base_stat, 0);

                return ({
                            id : p.id,
                            name : p.name.charAt(0).toUpperCase() + p.name.slice(1),
                            number : p.pokedex_numbers[1].entry_number,
                            height : pokemonData.height,
                            weight : pokemonData.weight,
                            types : pokemonData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                            stats : pokemonData.stats.map(s => { return {
                                                                            statName : s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1),
                                                                            statValue : s.base_stat
                                                                        }}),
                            statSum : statSum,
                            evolutionTree : evolutions,
                            images : [pokemonData.sprites.front_default, pokemonData.sprites.back_default]
                        }) 
            }));

            return pokedexForApp;
    }
)



const initialState =
{
    pokedex: [],
    isLoading: false
}




export const pokeSlice = createSlice({
    name: 'poke',
    initialState,
    reducers: {
        turnOnSpinner: (state) => {
            state.isLoading = true;
        },
        turnOffSpinner: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: {
        [fetchAsyncPokedex.pending] : () => {
            console.log("Promise fetchAsyncPokedex is pending.");
        },
        [fetchAsyncPokedex.rejected] : () => {
            console.log("Promise fetchAsyncPokedex was rejected.");
            //return(redirect("/notfound"));
        },
        [fetchAsyncPokedex.fulfilled] : (state, res) => {

            const pokedexForApp = res.payload;
            return ({ pokedex: pokedexForApp, isLoading: false });
        }
    }    
});

// Fuctions that components may use to subscribe and retrieve a certain piece/field of the state in the Redux store.
export const getPokedexPage = (state) => state.poke.pokedex;
export const getPokemonByName = (pokemonName) => (state) => { return state.poke.pokedex.find(pokemon => pokemon.name === pokemonName); };  // Using currying to be able to call useSelector(getPokemonByName('pokemon-name')) in the UI.
export const getEvolutionsImages = (evolutionTree) => (state) => {  if (evolutionTree === undefined) return null;
                                                                    return (
                                                                      evolutionTree.map(e => { 
                                                                        /* The evolution API may return evolutions invented in next generations and not included in our Kanto (1st gen) pokédex. We must ignore them. */
                                                                            const searchedSpecie = state.poke.pokedex.find(pokemon => pokemon.name === e); 
                                                                            if (searchedSpecie === undefined) return null;  // Evolutions not present in 1st gen won't be found in our pokédex: find() would return undefined.
                                                                            else return {
                                                                                name: e,
                                                                                image: searchedSpecie.images[0]
                                                                            }
                                                                      }).filter(e => e !== null)  // We must ignore null items (evolutions that point to species not included in Gen 1).
                                                                    )
                                                                };
export const getPokedexStatus = (state) => { return (state.poke.pokedex.length === 0) ? ("EMPTY") : ("FULL") };
export const getSpinnerStatus = (state) => state.poke.isLoading;

// Finalizing actions and reducers.
export const { turnOffSpinner, turnOnSpinner } = pokeSlice.actions;
export default pokeSlice.reducer;