import React from "react";
import { useNavigate } from "react-router";

export const PokedexPage = (props) =>
{
    const navigate = useNavigate();

    return (
        <div className="pokedexpage">
            { props.data.map((pokemon) => {return (
                <div className="pokemon_entry" key={pokemon.name}>
                    <button onClick={(e) => {e.preventDefault(); navigate("/pokémon/" + pokemon.name)}}>
                        <img src={pokemon.images[0]} alt="pokemon_sprite" />
                        <h3>{pokemon.name}</h3>
                    </button>
                </div>
                )})
            }
        </div>
    );
}