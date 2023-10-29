import React from "react";
import { useNavigate } from "react-router";

export const Header = () =>
{
    const navigate = useNavigate();

    return (
        <div className="header">
            <h1 onClick={(e) => {e.preventDefault(); navigate('/');}}>Pokédex</h1>
        </div>
    )
}