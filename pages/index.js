import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import {
  get,
  formatPokemonName,
  roman_to_Int,
  is_numeric,
} from "../helpers/functions";
import {
  BubbleContainer,
  PokeCard,
  PokeLoader,
  PokeNavbar,
} from "../components";

export default function Home({ baseUrl }) {
  const listInnerRef = useRef();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState({
    results: [],
  });
  const [currPage, setCurrPage] = useState(
    baseUrl + "?limit=" + limit + "&offset=" + offset
  ); // storing current page number
  const [prevPage, setPrevPage] = useState(""); // storing prev page number
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  const [isLoading, setIsLoading] = useState(false); // setting a flag to know the last list

  //     set search query to empty string
  const [q, setQ] = useState("");
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["name", "id"]);
  const [filterParam, setFilterParam] = useState("All");

  useEffect(async () => {
    if (!wasLastList && prevPage !== currPage) {
      fetchData().then((data) => {
        setPokemonList(data);
        console.log(data);
        setIsLoading(false);
      });
    }
    if (filterParam == "Generation") {
      await updatePokemonSpecies();
    }
  }, [currPage, prevPage, wasLastList, pokemonList, filterParam]);

  const fetchData = async () => {
    setIsLoading(true);
    let response = {};
    let list = await get(currPage);
    if (list) {
      for (let i = 0; i < list.results.length; i++) {
        list.results[i].pokemon = await get(list.results[i].url);
        if (list.results[i].pokemon) {
          list.results[i].pokemon.name = formatPokemonName(
            list.results[i].pokemon?.name
          );
        }
      }

      if (!list.results.length) {
        setWasLastList(true);
        return;
      }

      if (list.next != null) {
        setPrevPage(currPage);
        setPageParams(list.next);
      }
      if (list && pokemonList) {
        response = {
          count: list.count,
          next: list.next,
          previuos: list.previuos,
          results: [...pokemonList.results, ...list.results],
        };
      }
    }
    return response;
  };

  const updatePokemonSpecies = async () => {
    let list = pokemonList;
    if (list) {
      for (let i = 0; i < list.results.length; i++) {
        if (list.results[i].pokemon.species.data === undefined) {
          list.results[i].pokemon.species = await getSpecies(
            list.results[i].pokemon.species
          );
        }
      }

      setPokemonList(list);
    }
  };

  const getSpecies = async (species) => {
    const data = await get(species.url);
    species.data = data;
    console.log(species);
    return species;
  };

  const setPageParams = (url) => {
    const params = new URLSearchParams("?" + url.split("?")[1]);
    let _o = params.get("offset");
    let _l = params.get("limit");

    setOffset(_o == 0 ? parseInt(_l) : parseInt(_o));
  };

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
        setCurrPage(pokemonList.next);
      }
    }
  };

  const handleSelect = (e) => {
    setLimit(e);
    setCurrPage(baseUrl + "?limit=" + e + "&offset=" + offset);
  };

  const handleSearch = (items) => {
    let filtered = items?.filter((item) => {
      switch (filterParam) {
        case "All":
          return searchParam.some((search) => {
            if (q !== "") {
              return (
                item.pokemon[search]
                  .toString()
                  .toLowerCase()
                  .indexOf(q.toLowerCase()) > -1
              );
            } else return item.pokemon[search].toString();
          });

        case "Generation":
          if (q !== "") {
            if (is_numeric(q)) {
              return (
                roman_to_Int(
                  item.pokemon.species?.data?.generation?.name
                    ?.toString()
                    .split("-")[1]
                )
                  .toString()
                  .indexOf(q.toString()) > -1
              );
            } else {
              return (
                item.pokemon.species?.data?.generation?.name
                  ?.toString()
                  .indexOf(q.toString()) > -1
              );
            }
          } else return item.pokemon.name.toString();

        case "Version":
          return searchParam.some((search) => {
            if (q !== "") {
              return item.pokemon.game_indices.some((index) => {
                return index.version[search]
                  ? index.version[search]
                      .toString()
                      .toLowerCase()
                      .indexOf(q.toLocaleLowerCase()) > -1
                  : false;
              });
            } else return item.pokemon[search].toString();
          });
      }
    });
    return filtered ? filtered : [];
  };

  return (
    <div className="pokecon">
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="./pokeball.svg" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
      </Head>
      <PokeNavbar
        count={pokemonList.count}
        offset={offset}
        limit={limit}
        onLimitSelect={(ev) => handleSelect(ev)}
        searchparam={q}
        onSearchChange={(ev) => setQ(ev.target.value)}
        filter={filterParam}
        onFilterSelect={(ev) => setFilterParam(ev)}
      />

      {isLoading && <PokeLoader />}

      {/* <Row style={{ width: "100px", height: "100px" }}>
        <BubbleContainer dataLitHue="20" dataLitCount="100" />
      </Row> */}

      <Row className="pokerow" onScroll={onScroll} ref={listInnerRef}>
        {handleSearch(pokemonList?.results).map((res) => {
          return (
            <PokeCard
              key={res?.pokemon?.id}
              pokemon={res?.pokemon}
              onClick={() => setModalShow(true)}
              url={baseUrl}
            />
          );
        })}
      </Row>
    </div>
  );
}

export async function getServerSideProps(context) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  return {
    props: {
      baseUrl,
    },
  };
}
