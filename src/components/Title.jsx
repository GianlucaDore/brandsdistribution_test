import React from "react";
import pokemonLogo from '../images/Pokemon_logo.png'

export const Title = () =>
{
    return (
        <div className="title">
            <img src={pokemonLogo} alt="pokémon_logo" />
            <h1>The Kanto Pokédex</h1>
            <h4>Choose the pokémon you want to know info about:</h4>
        </div>
    )
}