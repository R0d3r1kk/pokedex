import Head from "next/head";
import { useRef, useState, useEffect, useCallback } from "react";
import { Row, CloseButton, Dropdown } from "react-bootstrap";
import {
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
import { getPokemons } from "../helpers/GraphHelper.tsx";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function Home({ baseUrl }) {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState({
    results: [],
  });
  const [currPage, setCurrPage] = useState(0); // storing current page number
  const [prevPage, setPrevPage] = useState(-1); // storing prev page number
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

  useEffect(() => {
    if (!wasLastList && prevPage !== currPage) {
      fetchData().then((data) => {
        setIsLoading(false);
        if (!data) return;
        setOffset(parseInt(data.results?.length));
        setPokemonList(data);
        console.log(data);

        toast(
          (t) => (
            <span>
              Get More <>Pokemons</>{" "}
              <a
                className="toastrefresh"
                onClick={() => {
                  setCurrPage(pokemonList.next);
                  toast.dismiss("refresh");
                }}
              >
                Refresh
              </a>
            </span>
          ),
          {
            id: "refresh",
            icon: <img src="/pokeball.svg" width={30} height={30} />,
            position: "bottom-left",
            duration: Infinity,
          }
        );
      });
    }
  }, [currPage, prevPage, wasLastList, pokemonList]);

  const fetchData = () => {
    setIsLoading(true);
    return getPokemons({ limit: limit, offset: offset }).then((res) => {
      const response = {};
      if (!res) return;

      const list = res.data;
      if (!list.results.length) {
        setWasLastList(true);
        return;
      }

      toast.success(`Rows retrieved ${list.results?.length}`, {
        id: "rows",
        icon: <img src="/pokeball.svg" width={30} height={30} />,
        position: "top-center",
      });

      setPrevPage(currPage);

      if (list && pokemonList) {
        response = {
          count: list.pagination.item.count,
          next: currPage + 1,
          previuos: currPage - 1,
          results: [...pokemonList.results, ...list.results],
        };
      }

      return response;
    });
  };

  const handleSelect = (e) => {
    setLimit(parseInt(e));
    setCurrPage(0);
  };

  const handleSearch = (items) => {
    let filtered = items?.filter((item) => {
      switch (filterParam) {
        case "All":
          return searchParam.some((search) => {
            if (q !== "") {
              return (
                item[search].toString().toLowerCase().indexOf(q.toLowerCase()) >
                -1
              );
            } else return item[search].toString();
          });

        case "Generation":
          if (q !== "") {
            if (is_numeric(q)) {
              return (
                roman_to_Int(
                  item.species?.generation?.name?.toString().split("-")[1]
                )
                  .toString()
                  .indexOf(q.toString()) > -1
              );
            } else {
              return (
                item.species?.generation?.name
                  ?.toString()
                  .indexOf(q.toString()) > -1
              );
            }
          } else return item.name.toString();

        case "Version":
          return searchParam.some((search) => {
            if (q !== "") {
              return item?.game_indices?.some((index) => {
                return index.version[search]
                  ? index.version[search]
                      .toString()
                      .toLowerCase()
                      .indexOf(q.toLocaleLowerCase()) > -1
                  : false;
              });
            } else return item[search].toString();
          });
        case "Color":
          if (q !== "") {
            return (
              item?.species?.color?.name
                .toString()
                .toLowerCase()
                .indexOf(q.toLocaleLowerCase()) > -1
            );
          } else return item.name.toString();
        case "Type":
          if (q !== "" && q.indexOf(",") == -1) {
            return item.types.some((itemtype) => {
              return (
                itemtype?.type?.name
                  .toString()
                  .toLowerCase()
                  .indexOf(q.toLocaleLowerCase()) > -1
              );
            });
          } else if (q.indexOf(",") > -1) {
            var qs = q.split(",");
            if (qs[1])
              return (
                item.types[0]?.type?.name
                  .toString()
                  .toLowerCase()
                  .indexOf(qs[0]) > -1 &&
                item.types[1]?.type?.name
                  .toString()
                  .toLowerCase()
                  .indexOf(qs[1]) > -1
              );
            else
              return (
                item.types[0]?.type?.name
                  .toString()
                  .toLowerCase()
                  .indexOf(qs[0]) > -1
              );
          } else return item.name.toString();
      }
    });
    return filtered ? filtered : [];
  };

  return (
    <div className="pokecon">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
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

      <Row className="pokerow">
        {handleSearch(pokemonList?.results).map((res) => {
          return (
            <PokeCard
              key={`${res?.name}-${res?.id}`}
              pokemon={res}
              onClick={() => setModalShow(true)}
              url={baseUrl}
            />
          );
        })}
      </Row>
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && t.type != "blank" && (
                  <CloseButton
                    onClick={() => toast.dismiss(t.id)}
                  ></CloseButton>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
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
