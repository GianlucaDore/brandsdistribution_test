import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPokemonByName } from "../redux/pokeSlice";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";
import '../css/Pokemon.css';

export const Pokemon = () =>
{
    const urlParams = useParams();

    const pokemonRequested = useSelector(getPokemonByName(urlParams.name));

    return (
        <div className="pokemon">
            <Header />
            <PokemonCard data={pokemonRequested} />
        </div>
    );
}