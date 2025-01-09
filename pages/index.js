import { useState, useEffect, Suspense } from "react";
import { Stack } from "react-bootstrap";
import {
  getCardFormatByType,
  roman_to_Int,
  is_numeric,
} from "../helpers/Functions";
import {
  PokeCard,
  PokeLoader,
  PokeNavbar,
  PokeSideBar
} from "../components";
import { useSpring, animated } from '@react-spring/web';
import { Colors, getGoeFooterOptions, makeFooterAnimation } from "../helpers/Utils.jsx";
import { isMobile } from 'react-device-detect';
import db from "../DB/database.config";

export default function Home(props) {
  const [limit, setLimit] = useState(0);
  const [pokemonList, setPokemonList] = useState({
    results: [],
  });
  const [obtainedPokemons, setObtainedPokemons] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "id"]);
  const [filterParam, setFilterParam] = useState("All");
  const [filteredPokemonList, setFilterPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [currentAnimOptions, setCurrentAnimOptions] = useState();
  const [curretnCardFooter, setCurrentCardFooter] = useState();
  const [sidebarOpen, setSideBarOpen] = useState();


  const [sb_props, sb_api] = useSpring(() => ({
    x: "100vw",
    width: "100vw",
  }));

  useEffect(() => {
    // if (!wasLastList) {
    //   setIsLoading(true);
    //   fetchData().then((data) => populateData(data));
    // }d
    setSideBarOpen(false);
    setIsLoading(true);
    if (props) {
      setLimit(props.limit);
      setObtainedPokemons(props.offset);
      getLocalItems().then((data) => {
        setPokemonList(data);
        setIsLoading(false);
      }).catch((e) => {
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (pokemonList.results.length > 0) {
      setFilterPokemonList(handleSearch(_limit(pokemonList?.results, limit)));
    }
  }, [q, limit, pokemonList, filterParam])

  const getLocalItems = async () => {
    return db.pokemonlist
      .where("id")
      .equals(0)
      .first()
      .then((item) => {
        return item;
      });
  };

  function _limit(arr, c) {
    return arr.filter((x, i) => {
      if (i <= (c - 1)) { return true }
    })
  }

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

  function openPokeDetail(pokemon, isOpen, rev) {
    var pkmn = document.querySelector("#" + pokemon.name);
    document.querySelector(".pokerow").scrollTo({ "top": pkmn?.offsetTop - 120, "behavior": "smooth" });
    sb_api.start({
      from: {
        x: "100vw",
        width: !rev && isOpen ? "40vw" : "100vw",
      },
      to: {
        x: "40vw",
        width: "40vw",
      },
      onResolve: (res, ctr, item) => {
        var pkmn = document.querySelector("#" + pokemon.name);
        document.querySelector(".pokerow").scrollTo({ "top": pkmn?.offsetTop - 120, "behavior": "smooth" });
        setSideBarOpen(isOpen);
      },
      reverse: rev
    });
  }

  function getScrollbarColor() {
    return selectedPokemon ? Colors[selectedPokemon.types[0].type.name] : "transparent";
  }

  const handleViewSidebar = (pokemon, options, footer) => {

    console.log(pokemon, options);
    setSelectedPokemon(pokemon);
    setCurrentAnimOptions(options);
    setCurrentCardFooter(footer);
    openPokeDetail(pokemon, true, false);
  };

  const closeViewSidebar = (pokemon, options, footer) => {
    openPokeDetail(pokemon, false, true);
  };

  if (isMobile) return <div className="pokecon"></div>;

  return (
    <div className="pokecon">

      <PokeNavbar
        count={props.count}
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
        isOpen={sidebarOpen}
        close={closeViewSidebar}
        currentPokemon={selectedPokemon}
        animOptions={currentAnimOptions}
        footer={curretnCardFooter}
        springs={{ x: sb_props.x }}
      />
      <Suspense fallback={<PokeLoader />}>
        <animated.div
          className={sidebarOpen ? "row pokerow sbopen" : "row pokerow"}
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
                selected={selectedPokemon?.name}
                pokemon={res}
                onClick={handleViewSidebar}
              />
            );
          })}
        </animated.div>
        <Stack
          id="style-12"
          className="thumbs"
          direction="vertical"
          gap={1}
          style={{
            "--scrollbarbg": `${getScrollbarColor()}`
          }}>
          {
            filteredPokemonList?.map((res, i) => {

              const format = getCardFormatByType(res.types);
              let options = getGoeFooterOptions(format.formatedTypes);
              let footer = makeFooterAnimation(format?.formatedTypes, options, 0);

              return <div
                key={`${i}-${res?.name}-${res?.id}_thumb`}
                className={res?.name == selectedPokemon?.name ? "thumb-con active" : "thumb-con"}
                style={{
                  "--shadow-bg": format?.formatedTypes[0].color,
                }}
                onClick={(ev) =>
                  handleViewSidebar(res, options, footer)
                }
              >
                <img
                  loading="lazy"
                  src={res?.sprites[0].sprites.other.showdown.front_default}
                  width={40}
                  height={40}
                  alt={res?.name}
                />
                <h5 className="thumb-id">#{res?.id}</h5>
              </div>
            })
          }
        </Stack>

      </Suspense>

    </div>
  );
}
