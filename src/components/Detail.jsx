import "./Detail.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  console.log(myPokemon);
  return (
    <div className="detailContainer">
      {myPokemon ? (
        <>
          <h1 style={{ textTransform: "capitalize" }} className="text">
            {myPokemon.name}
          </h1>
          <div className="detailContainer__profile">
            <img src={myPokemon.image} alt="" />
            <div>
              <p>Healthpoints: {myPokemon.healthpoints}</p>
              <p>Attack: {myPokemon.attack}</p>
              <p>Defense: {myPokemon.defense}</p>
              <p>Speed: {myPokemon.speed}</p>
              <p>Height: {myPokemon.height}</p>
              <p>Weight: {myPokemon.weight}</p>
              <p>ID: {myPokemon.id}</p>
            </div>
          </div>
          <div className="typeContainer">
            {myPokemon?.types?.map((e, index) => {
              return (
                <div
                  className="types"
                  style={{ textTransform: "capitalize" }}
                  key={index}
                >
                  
                  <img src={`/images/Types/type${e.name}.png`} alt={e.name} />
                  <p> {e.name} </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link className="link" to="/home">
        Volver
      </Link>
    </div>
  );
}
