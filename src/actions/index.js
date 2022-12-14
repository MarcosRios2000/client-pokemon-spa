import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios.get("https://server-pokemon-spa.herokuapp.com/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function reloadPokemons() {
  return {
    type: "RELOAD_POKEMONS",
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("https://server-pokemon-spa.herokuapp.com/pokemons?name=" + name.toLowerCase());
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const json = await axios.get("https://server-pokemon-spa.herokuapp.com/types");
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "https://server-pokemon-spa.herokuapp.com/pokemons",
      payload
    );
    console.log(response);
    return response;
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterByCreation(payload) {
  return {
    type: "FILTER_BT_CREATION",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("https://server-pokemon-spa.herokuapp.com/pokemons/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
