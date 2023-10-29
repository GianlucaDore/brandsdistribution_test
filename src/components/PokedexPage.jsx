import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";

export const PokedexPage = (props) =>
{
    const [currentPage, setCurrentPage] = useState(0);  // local state variable to keep track of the current page.
    const [totalPages, setTotalPages] = useState(0); // local state variable to set the total number of pages.
 
    const itemsPerPage = 25;

    const navigate = useNavigate();

    useEffect(() => {

        /* At mounting phase, we set the total number of page state variable: data length / items per page. */
        setTotalPages(Math.ceil(props.data.length / itemsPerPage));

    }, [props.data.length]);

    /* The following code calculates the data start index and the end index of the page to display. */
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    /* Once the indexes are calculated, we slice the data to create a subset (the page data). */
    const subset = props.data.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => { // This function changes the current page to display.
        setCurrentPage(selectedPage.selected); // currentPage is a state variable, so when it changes, the component re-renders and re-calculates the indexes, so a new subset (page data) will be created. 
    };  

    return (
        <div className="pokedexpage">
            <div className="data_subset">
                { subset.map((pokemon) => {return (
                    <div className="pokemon_entry" key={pokemon.name}>
                        <button onClick={(e) => {e.preventDefault(); navigate("/pokémon/" + pokemon.name)}}>
                            <img src={pokemon.images[0]} alt="pokemon_sprite" />
                            <h3>{pokemon.name}</h3>
                        </button>
                    </div>
                    )})
                }
            </div>
            <ReactPaginate pageCount={totalPages} onPageChange={handlePageChange} containerClassName="pagination" pageClassName="page" activeClassName="active_page" disabledClassName="disabled_page" nextClassName="next_page" previousClassName="previous_page" />
        </div>
    );
}