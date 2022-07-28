import "./Card.css";
import React from "react";

export default function Card({ name, image, types }) {
  return (
    <div className="cardContainer">
      <h3 className="Name" style={{ textTransform: "capitalize" }}>
        {name}
      </h3>
      <img src={image} alt={name} width="200px" height="200px" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {types.map((e, index) => {
          return (
            <div className="type" key={index}>
              <img src={`../images/Types/type${e.name}.png`} alt={e.name} width="50px" height="50px" />
              <p style={{ textTransform: "capitalize" }}> {e.name} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
