import React from "react";
import { useNavigate } from "react-router";

export const PokedexPage = (props) =>
{
    const navigate = useNavigate();

    return (
        <div className="pokedexpage">
            { props.data.map((pokemon) => {return (
                <div className="pokemon_entry" key={pokemon.name}>
                    <button onClick={(e) => {e.preventDefault(); navigate("/pokémon/"+ pokemon.id)}}>
                        <img src={pokemon.image} alt="pokemon_sprite" />
                        <h6>{pokemon.name}</h6>
                    </button>
                </div>
                )})
            }
        </div>
    );
}