import { reloadPokemons } from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  reloadPokemons:[],
  detail: [],
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        reloadPokemons: action.payload,
      };
    case "RELOAD_POKEMONS":
      return {
        ...state,
        pokemons: state.reloadPokemons,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "POST_POKEMONS":
      return {
        ...state,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter(
              (el) =>
                el.types.filter((el) => el.name === action.payload).length > 0
            );
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_BT_CREATION":
      const allPokemons2 = state.allPokemons;
      const creationFiltered =
        action.payload === "created"
          ? allPokemons2?.filter((el) => typeof(el.id) === "string")
          : allPokemons2?.filter((el) => el.id < 50);
      return {
        ...state,
        pokemons: action.payload === "All" ? allPokemons2 : creationFiltered,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc_alf"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };
    case "ORDER_BY_ATTACK":
      let sortedArr2 =
        action.payload === "asc_fu"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (a.attack < b.attack) {
                return 1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (a.attack < b.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr2,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }

  // const typesEach = types?.map(el=>{
  //     for(let i=0; i<el.length; i++) return el[i]
  // })
  // types?.map(el=>{
  //     for(let i=0; i<el.length; i++) el[i].filter(el=>el === action.payload)
  // })
  // .filter(el => el.types.map(el=>el.name).map(el=>{
  //     for(let i=0; i<el.length; i++) el[i]
  // }))
  // ?.filter(el => el.types?.map(el=>el?.includes(action.payload)))
  //allPokemons.filter(el=>el.name === "bulbasaur")
  // allPokemons.filter(el=>(el.types.forEach(el=>el.name)) === action.payload)
  // .map(el => el.types.map(ele=>ele.name)).map(elem=>{
  //     for(let i=0; i<elem.length; i++) {
  //         elem.includes(action.payload)
  //     }
  // })
}

export default rootReducer;
