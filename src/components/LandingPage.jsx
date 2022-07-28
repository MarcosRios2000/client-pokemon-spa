import "./LandingPage.css";
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="Landing">
      <h1>Welcome</h1>
      <Link className="link" to="/home">
        Join
      </Link>
    </div>
  );
}
