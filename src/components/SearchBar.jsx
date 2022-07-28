import "./SearchBar.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemons, getPokemons } from "../actions";

export default function SearchBar() {
  const allPokemons = useSelector((state) => state.pokemons);
  const allPokemonNames = allPokemons.length > 0 && allPokemons.map((el)=>el.name) 

  const dispatch = useDispatch();

  const [pokemonNames, setPokemonNames] = useState([])
  const [name, setName] = useState("");
  const [suggest, setSuggest] = useState("");
  const [activeSuggest, setActiveSuggest] = useState(true)


  useEffect(()=>{
    dispatch(getPokemons())
  }, [])
  


  function handleInputChange(e) {
    e.preventDefault();
    let searchVal = e.target.value
    let suggestion = []
    console.log(allPokemonNames, "error all pokemons")
    console.log(pokemonNames, "error all pokemons")
    if(searchVal.length > 0 ){
      if(pokemonNames.length < 1){
        suggestion = allPokemonNames.sort().filter((e)=> e.toLowerCase().includes(searchVal.toLowerCase()))
      }else{
        suggestion = pokemonNames.sort().filter((e)=> e.toLowerCase().includes(searchVal.toLowerCase()))
      }
      
    }
    if(suggestion.length > 0){

      setSuggest(suggestion[0].charAt(0).toUpperCase() + suggestion[0].slice(1))
    }
    if(suggestion.length < 1){
      setSuggest("")
    }
    setName(searchVal);
    setActiveSuggest(true)
  }



  function cleanInput() {
    setName("")
  }
console.log(suggest, "suggest")
  function acceptSuggestion(e){
    e.preventDefault();

      setName(suggest)
      setActiveSuggest(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(pokemonNames.length < 1){
      setPokemonNames(allPokemonNames)
    }
    dispatch(getNamePokemons(name));
    cleanInput();

  }

  return (
    <div className="searchContainer">
      <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        value={name}
        onChange={(e) => handleInputChange(e)}
        id="busqueda"
      />
      <button className="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      </div>
      <br/>
{activeSuggest && suggest ?

      <div
      className="suggestion"
      onClick={(e) => acceptSuggestion(e)}
      >
        {activeSuggest && suggest}       
      </div>
      : 
      <div></div>
}

    </div>
  );
}