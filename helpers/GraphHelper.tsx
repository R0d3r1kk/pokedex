const baseUrl = "https://beta.pokeapi.co/graphql/v1beta";
const method = "POST";

const queryPokemon = `query queryPokemon($id: Int!) {
  pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
    id
    name
    base_experience
    height
    abilities:pokemon_v2_pokemonabilities{
      slot
      ability: pokemon_v2_ability{
        id
        name
        effect: pokemon_v2_abilityeffecttexts{
          effect,
          short_effect
        }
      }
    }
    moves: pokemon_v2_pokemonmoves {
      id
      level
      move: pokemon_v2_move {
        name
        power
        pp
        accuracy
        type: pokemon_v2_type {
          name
        }
      }
    }
    game_indices: pokemon_v2_pokemongameindices {
      game_index
      version: pokemon_v2_version {
        id
        name
      }
    }
    stats: pokemon_v2_pokemonstats {
      base_stat
      effort
      stat: pokemon_v2_stat {
        id
        game_index
        name
      }
    }
    types: pokemon_v2_pokemontypes {
      slot
      type: pokemon_v2_type {
        id
        name
      }
    }
    species: pokemon_v2_pokemonspecy {
      id
      gender_rate
      capture_rate
      is_baby
      is_mythical
      is_legendary
      growth_rate:pokemon_v2_growthrate {
        formula
        name
      }
      habitat: pokemon_v2_pokemonhabitat {
        id
        name
      }
      color: pokemon_v2_pokemoncolor {
        id
        name
      }
      generation: pokemon_v2_generation {
        id
        name
      }
      evolution_chain: pokemon_v2_evolutionchain {
        id
        chain: pokemon_v2_pokemonspecies {
          name
          is_legendary
          is_mythical
          is_baby
          id
          evolution_details: pokemon_v2_pokemonevolutions{  
            min_level
            trigger:pokemon_v2_evolutiontrigger{
              name
            }
          }
        }
      }
    }
    sprites: pokemon_v2_pokemonsprites {
      id
      sprites
    }    
  }
}`;

const queryPokemons = `query queryPokemons($limit: Int, $offset: Int) {
  pagination: pokemon_v2_pokemon_aggregate{
   item: aggregate{
     count
   }
 }
 results: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
   id
   name
   base_experience
   height
   abilities:pokemon_v2_pokemonabilities{
     slot
     ability: pokemon_v2_ability{
       id
       name
       effect: pokemon_v2_abilityeffecttexts{
         effect,
         short_effect
       }
     }
   }
   moves: pokemon_v2_pokemonmoves {
     id
     level
     move: pokemon_v2_move {
       name
       power
       pp
       accuracy
       type: pokemon_v2_type {
         name
       }
     }
   }
   game_indices: pokemon_v2_pokemongameindices {
     game_index
     version: pokemon_v2_version {
       id
       name
     }
   }
   stats: pokemon_v2_pokemonstats {
     base_stat
     effort
     stat: pokemon_v2_stat {
       id
       game_index
       name
     }
   }
   types: pokemon_v2_pokemontypes {
     slot
     type: pokemon_v2_type {
       id
       name
     }
   }
   species: pokemon_v2_pokemonspecy {
     id
     gender_rate
     capture_rate
     is_baby
     is_mythical
     is_legendary
     growth_rate:pokemon_v2_growthrate {
       formula
       name
     }
     habitat: pokemon_v2_pokemonhabitat {
       id
       name
     }
     color: pokemon_v2_pokemoncolor {
       id
       name
     }
     generation: pokemon_v2_generation {
       id
       name
     }
     evolution_chain: pokemon_v2_evolutionchain {
      id
      chain: pokemon_v2_pokemonspecies {
        name
        is_legendary
        is_mythical
        is_baby
        id
        evolution_details: pokemon_v2_pokemonevolutions{  
          min_level
          trigger:pokemon_v2_evolutiontrigger{
            name
          }
        }
      }
    }
   }
   sprites: pokemon_v2_pokemonsprites {
     id
     sprites
   }
 }
}
`;

type gqlFetchVariables = {
  id: 1;
};
type gqlPaginationVariables = {
  limit: 10;
  offset: 0;
};

export const getPokemon = (gqlParams: gqlFetchVariables) => {
  return fetch(baseUrl, {
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({
      query: queryPokemon,
      variables: gqlParams,
    }),
    method: method,
  })
    .then((res) => {
      // Unfortunately, fetch doesn't send (404 error) into the cache itself
      // You have to send it, as I have done below
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPokemons = (gqlParams: gqlPaginationVariables) => {
  return fetch(baseUrl, {
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({
      query: queryPokemons,
      variables: gqlParams,
    }),
    method: method,
  })
    .then((res) => {
      // Unfortunately, fetch doesn't send (404 error) into the cache itself
      // You have to send it, as I have done below
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
