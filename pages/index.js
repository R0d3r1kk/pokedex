import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { get } from "../helpers/functions";

import { PokeCard, PokeLoader } from "../components";

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

  useEffect(async () => {
    if (!wasLastList && prevPage !== currPage) {
      fetchData().then((data) => {
        setPokemonList(data);
        console.log(data);
        setIsLoading(false);
      });
    }
  }, [currPage, prevPage, wasLastList, pokemonList]);

  const fetchData = async () => {
    setIsLoading(true);
    let response = {};
    let list = await get(currPage);
    if (list) {
      for (let i = 0; i < list.results.length; i++) {
        list.results[i].pokemon = await get(list.results[i].url);
      }

      if (!list.results.length) {
        setWasLastList(true);
        return;
      }

      setPrevPage(currPage);
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
      {isLoading && <PokeLoader />}

      <Row onScroll={onScroll} ref={listInnerRef}>
        {pokemonList.results.map((res) => {
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
