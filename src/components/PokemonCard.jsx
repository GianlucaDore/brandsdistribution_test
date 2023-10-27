import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEvolutionsImages } from "../redux/pokeSlice";

export const PokemonCard = (props) => 
{
    const evolutionTreeCard = useSelector(getEvolutionsImages(props.data.evolutionTree));

    const navigate = useNavigate();

    return (
        <div className="pokemoncard">
            <div>
                <h1>{props.data.name}</h1>
                <h5>N°{props.data.number}</h5>
                <img src={props.data.images[0]} alt="sprite_front" />
                <img src={props.data.images[1]} alt="sprite_back" />
                <p>Height: {props.data.height}, Weight: {props.data.weight}</p>
            </div>
            <div>
                {props.data.types.map(t => <h2 key={t}>{t}</h2>)}
                <div>
                    <h2>Stats sum: {props.data.statSum}</h2>
                    <div>
                        <h2>Stats:</h2>
                        {props.data.stats.map(s => <div className="stat" key={s.statName}>
                                                     <h6>{s.statName}</h6>
                                                     <h6>{s.statValue}</h6>
                                                   </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="evolutiontree">
                <h2>Evolution Tree:</h2>
                { evolutionTreeCard.map(e => <div className="pokemon_entry" key={e.name}>
                                                         <button onClick={(event) => {event.preventDefault(); navigate("/pokémon/" + e.name)}}>
                                                            <img src={e.image} alt="pokemon_sprite" />
                                                            <h3>{e.name}</h3>
                                                         </button>
                                                       </div>
                                             )
                }
            </div>
        </div>
    )
}