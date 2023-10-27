import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { PokedexPage } from "../components/PokedexPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncPokedex, getPokedexPage, getPokedexStatus, getSpinnerStatus, turnOnSpinner } from "../redux/pokeSlice";
import { Title } from "../components/Title";
import { MoonLoader } from "react-spinners";

export const Home = () =>
{
    const dispatch = useDispatch();

    const pokedexPage = useSelector(getPokedexPage);

    const pokedexStatus = useSelector(getPokedexStatus);

    const isLoading = useSelector(getSpinnerStatus);

    useEffect(() => {
        if (pokedexStatus === "EMPTY")
        {
            dispatch(turnOnSpinner());
            dispatch(fetchAsyncPokedex());
        }
        
    }, [pokedexStatus, dispatch]);

    return (
        <div className="home">
            <Header />
            <Title />
            {(isLoading === true) ? (<MoonLoader loading={isLoading} />) : (<PokedexPage data={pokedexPage} />)}
        </div>
    )
}