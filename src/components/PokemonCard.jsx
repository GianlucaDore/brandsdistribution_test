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
                <div className="sprites_height_weight">
                    <div className="sprites">
                        <img src={props.data.images[0]} alt="sprite_front" />
                        <img src={props.data.images[1]} alt="sprite_back" />
                    </div>
                    <p>Height: {props.data.height}, Weight: {props.data.weight}</p>
                </div>
            </div>
            <div className="types_stats">
                <h2>Types:</h2>
                {props.data.types.map(t => <h2 className="type" key={t}>{t}</h2>)}
                <div className="stats">
                    <div className="stats_container">
                        <h2>Stats:</h2>
                        <div>
                            {props.data.stats.map(s => <div className="stat" key={s.statName}>
                                                        <h3>{s.statName}:</h3>
                                                        <h4>{s.statValue}</h4>
                                                    </div>)
                            }
                        </div>
                        <h2>Stats sum: <p>{props.data.statSum}</p></h2>
                    </div>
                </div>
            </div>
            <div className="evolutiontree">
                <h2>Evolution Tree:</h2>
                <div className="pokemon_entry_container">
                    { evolutionTreeCard.map((e, index) => <div className="pokemon_entry" key={e.name}>
                                                            <button onClick={(event) => {event.preventDefault(); navigate("/pokémon/" + e.name)}}>
                                                                <img src={e.image} alt="pokemon_sprite" />
                                                                <h3>{index+1}. {e.name}</h3>
                                                            </button>
                                                        </div>
                                                )
                    }
                </div>
            </div>
        </div>
    )
}