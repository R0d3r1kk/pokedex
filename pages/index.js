import Head from "next/head";
import { useRef, useState, useEffect, useCallback } from "react";
import { Row, CloseButton, Dropdown, Button, Stack, Collapse } from "react-bootstrap";
import {
  formatPokemonName,
  roman_to_Int,
  is_numeric,
  DeepEqual,
} from "../helpers/Functions";
import {
  PokeCard,
  PokeLoader,
  PokeNavbar,
  PokeSideBar
} from "../components";
import { getPokemons, getPokemonCount } from "../helpers/GraphHelper.tsx";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import db, { exportDB } from "../DB/database.config";
import { useSpring, animated } from '@react-spring/web';
import { Colors } from "../helpers/Utils.jsx";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [obtainedPokemons, setObtainedPokemons] = useState(0);
  const [pokemonList, setPokemonList] = useState({
    results: [],
  });
  const [pokemonCount, setPokemonCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "id"]);
  const [filterParam, setFilterParam] = useState("All");
  const [filteredPokemonList, setFilterPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [currentAnimOptions, setCurrentAnimOptions] = useState();
  const [curretnCardFooter, setCurrentCardFooter] = useState();
  const [reverse, setReverse] = useState(false);
  const [sidebarOpen, setSideBarOpen] = useState();


  const [sb_props, sb_api] = useSpring(() => ({
    x: "100vw",
    width: "100vw",
  }));

  useEffect(() => {
    // if (!wasLastList) {
    //   setIsLoading(true);
    //   fetchData().then((data) => populateData(data));
    // }
    setSideBarOpen(false);
    getPokemonCount(0).then((json) => {
      if (json)
        setPokemonCount(json.count);
      else
        setPokemonCount(0);
    });
  }, []);

  useEffect(() => {
    if (pokemonList.results.length > 0) {
      setFilterPokemonList(handleSearch(_limit(pokemonList?.results, limit)));
    }
  }, [q, limit, pokemonList, filterParam])

  useEffect(() => {
    if (pokemonCount) {
      setIsLoading(true);
      fetchData().then((data) => populateData(data));
    }
  }, [pokemonCount])

  useEffect(() => {
    if (pokemonCount) {
      if (pokemonList.results.length < pokemonList.count) {
        setIsLoading(true);
        getGraphQlItems().then((data) => populateData(data));
      }
    }
  }, [limit]);

  function _limit(arr, c) {
    return arr.filter((x, i) => {
      if (i <= (c - 1)) { return true }
    })
  }

  const populateData = (data) => {
    setIsLoading(false);
    if (!data) return;
    setObtainedPokemons(parseInt(data.results?.length));
    setPokemonList(data);

    console.log("data", data);

    if (data.count < pokemonCount)
      toast(
        (t) => (
          <span>
            Get More <>Pokemons</>{" "}
            <a
              className="toastrefresh"
              onClick={() => {
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
  };

  const fetchJson = () => {
    return fetch('./db.json')
      .then(response => {
        console.log(response);
        return response.json();
      }).catch((e) => {
        console.log(e.message);
      });
  }

  const fetchData = async () => {
    return getLocalItems().then((res) => {
      if (res.results.length <= 0) {
        return getGraphQlItems();
      }

      return res;
    }).catch((e) => {
      return getGraphQlItems();
    });
  };

  const getLocalItems = async () => {

    return fetchJson().then((res) => {
      if (res.results <= 0) {
        throw "data null";
      }
      return res;
    }).catch((e) => {
      return db.pokemonlist
        .where("id")
        .equals(0)
        .first()
        .then((item) => {
          toast(
            (t) => (
              <Stack direction="horizontal" gap={3}>
                {item.results?.length} Rows retrieved from dexie
                <Button variant="success" onClick={() => {
                  console.log("exporting db");
                  if (pokemonList.count > 0) {
                    setIsLoading(true);
                    exportDB(pokemonList);
                    setIsLoading(false);
                  }
                }} >export</Button>
              </Stack>

            ),
            {
              id: "rows",
              icon: <img src="/pokeball.svg" width={30} height={30} />,
              position: "bottom-right",
              duration: Infinity,
            }
          );
          return item;
        });
    });




  };

  const getGraphQlItems = async () => {
    return getPokemons({ limit: pokemonCount, offset: 0 }).then((res) => {
      var response = {};
      if (!res) return;

      let list = res.data;
      toast(
        (t) => (
          <span>
            {list.results?.length} Rows retrieved{" "}
          </span>
        ),
        {
          id: "rows",
          icon: <img src="/pokeball.svg" width={30} height={30} />,
          position: "bottom-right",
          duration: Infinity,
        }
      );
      if (list && pokemonList) {
        response = {
          count: list.pagination.item.count,
          results: [...pokemonList.results, ...list.results],
        };
      }

      storePokemonList({
        ...response,
        date_created: Date().toLocaleString(),
      });

      return response;
    });
  };

  const storePokemonList = async (obj) => {
    const pkl = {
      id: 0,
      count: obj?.count || 0,
      limit: limit,
      results: obj?.results || [],
      date_created: Date().toLocaleString(),
    };

    const id = await db.pokemonlist.put(pkl);
    console.info(`Rows Stored : ${pkl.results.length} rows - id ${id}`);
  };

  const handleSelect = (e) => {
    setLimit(parseInt(e));
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
            } else return item[search]?.toString();
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
          } else return item?.name?.toString();

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
            } else return item[search]?.toString();
          });
        case "Color":
          if (q !== "") {
            return (
              item?.species?.color?.name
                .toString()
                .toLowerCase()
                .indexOf(q.toLocaleLowerCase()) > -1
            );
          } else return item?.name?.toString();
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
          } else return item?.name?.toString();
      }
    });
    return filtered ? filtered : [];
  };

  function openPokeDetail(pokemon, ref) {
    sb_api.start({
      from: {
        x: "100vw",
        width: !reverse && sidebarOpen ? "40vw" : "100vw",
      },
      to: {
        x: "40vw",
        width: "40vw",
      },
      onStart: (res, ctr, item) =>{
        console.log(res, ctr, item);
        let sidebarValue = res.value.x;
        let sbVal = parseInt(sidebarValue.replace("vw", ""));
        if(sbVal > 40){
          document.querySelector("#" + pokemon.name).classList.add("disabled");
          setSideBarOpen(true);
        }else{
          setSideBarOpen(false);
        }
      },
      onResolve: (res, ctr, item) =>{
        console.log(res, ctr, item);
        document.querySelector(".pokerow").scrollTo({ "top": ref.current?.offsetTop - 120, "behavior": "smooth" });
      },
      reverse: reverse
    });
  }

  function getScrollbarColor() {
    return selectedPokemon ? Colors[selectedPokemon.types[0].type.name] : "transparent";
  }

  const handleViewSidebar = (pokemon, options, footer, ref) => {
    console.log(pokemon, ref);
    setReverse(false);
    setSelectedPokemon(pokemon);
    setCurrentAnimOptions(options);
    setCurrentCardFooter(footer);
    openPokeDetail(pokemon, ref);
    document.querySelector(".pokecard").classList.remove("disabled");
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
        offset={obtainedPokemons}
        limit={limit}
        onLimitSelect={(ev) => handleSelect(ev)}
        onSearchChange={setQ}
        filter={filterParam}
        onFilterSelect={(ev) => {
          setFilterParam(ev);
          setQ("");
        }}
      />

      {isLoading && <PokeLoader />}

      <PokeSideBar
        isOpen={!reverse}
        currentPokemon={selectedPokemon}
        animOptions={currentAnimOptions}
        footer={curretnCardFooter}
        springs={{ x: sb_props.x }}
      />

      <animated.div
        className="row pokerow"
        id="style-12"
        style={{
          width: sb_props.width,
          "--scrollbarbg": `${getScrollbarColor()}`
        }}>
        {filteredPokemonList?.map((res, i) => {
          return (
            <PokeCard
              isOpen={sidebarOpen}
              key={`${i}-${res?.name}-${res?.id}`}
              pokemon={res}
              onClick={handleViewSidebar}
            />
          );
        })}
      </animated.div>
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
