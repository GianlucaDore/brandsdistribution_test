import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getPokemonByName } from "../redux/pokeSlice";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";
import '../css/Pokemon.css';

export const Pokemon = () =>
{
    const navigate = useNavigate();

    const urlParams = useParams();

    const pokemonRequested = useSelector(getPokemonByName(urlParams.name));

    useEffect(() => {

        if (pokemonRequested === undefined)
            navigate('/NotFound');

    }, [pokemonRequested, navigate])

    return (
        <div className="pokemon">
            <Header />
            {(pokemonRequested === undefined) ? (null) : (<PokemonCard data={pokemonRequested} />)}
        </div>
    );
}