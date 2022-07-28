import "./Home.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterByType,
  filterByCreation,
  orderByName,
  orderByAttack,
  reloadPokemons,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [orden2, setOrden2] = useState("");
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(allPokemons)
    ? allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : allPokemons;


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    setLoading(false);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    // dispatch(getPokemons());
    // dispatch(getTypes());
    dispatch(reloadPokemons());
  }

  function handleFilterTypes(e) {
    dispatch(filterByType(e.target.value));
  }
  function handleFilterCreation(e) {
    dispatch(filterByCreation(e.target.value));
  }

  function handleSortAlf(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortAtt(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden2(`Ordenado ${e.target.value}`);
  }

  return loading ? (
    <div className="cargando">Loading...</div>
  ) : (
    <div className="Home">
      <div>
        <Link className="link" to="/create">
          Create your Pokémon
        </Link>
      </div>
      <div>
      <img className="Logo" src="./images/Logo.png" alt="logoBlanco"/></div>
      <button
        className="boton1"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset filters
      </button>
      <div className="content-select">
        <div>
          <select onChange={(e) => handleSortAlf(e)}>
            <option value="asc_alf">Alphabetic order ↑</option>
            <option value="desc_alf">Alphabetic order ↓</option>
          </select>
          <select onChange={(e) => handleSortAtt(e)}>
            <option value="asc_fu">Strength ↑</option>
            <option value="desc_fu">Strength ↓</option>
          </select>
          <select onChange={(e) => handleFilterTypes(e)}>
            <option value="All">All</option>
            {allTypes?.map((e) => {
              return (
                <option value={e.name} key={e.name}>
                  {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </option>
              );
            })}
          </select>
          <select onChange={(e) => handleFilterCreation(e)}>
            <option value="All">All</option>
            <option value="created">Fan made</option>
            <option value="api">Canon</option>
          </select>
        </div>

        <SearchBar />
        
        <Paginado
        className="homePaginado"
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />

        <div className={`homeCards ${allPokemons?.length > 1 ? "" : "cargando"}`}>
          {currentPokemons?.length > 0 ? (
            currentPokemons?.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card name={e.name} image={e.image} types={e.types} id={e.id} />
                  </Link>
                </div>
              );
            })
          ) : Object.entries(currentPokemons && currentPokemons).length !== 0 ? (
            <div key={currentPokemons.id}>
              <Link to={"/home/" + currentPokemons.id}>
                <Card
                  name={currentPokemons.name}
                  image={currentPokemons.image}
                  types={currentPokemons.types}
                  id={currentPokemons.id}
                />
              </Link>
            </div>
          ) : (
            <div className="cargandoContainer">
              <div>Loading...</div>
            <img className="cargandoGif" src="./images/LoadingPikachu.gif" alt=""></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}