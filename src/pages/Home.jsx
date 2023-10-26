import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { PokedexPage } from "../components/PokedexPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncPokedex, getPokedexPage, getPokedexStatus } from "../redux/pokeSlice";
import { Title } from "../components/Title";

export const Home = () =>
{
    const dispatch = useDispatch();

    const pokedexPage = useSelector(getPokedexPage);

    const pokedexStatus = useSelector(getPokedexStatus);

    useEffect(() => {
        if (pokedexStatus === "EMPTY")
            dispatch(fetchAsyncPokedex());
        
    }, [pokedexStatus, dispatch]);

    return (
        <div className="home">
            <Header />
            <Title />
            <PokedexPage data={pokedexPage} />
        </div>
    )
}