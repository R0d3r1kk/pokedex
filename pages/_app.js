import '../styles/app.css';
import '../styles/loader.css';
import '../styles/pokecard.css';
import '../styles/pokemodal.css';
import "../styles/poketabs.css";
import "../styles/animations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/goefooter.css";
import '../styles/pokesidebar.css';
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useEffect, useState } from 'react';
import db, { exportDB } from "../DB/database.config";
import { Stack, Button, CloseButton } from 'react-bootstrap';
import JsonDB from "../public/db.json"

// This default export is required in a new `pages/_app.js` file.
export default function PokeApp({ Component, pageProps }) {
    const [data, setData] = useState({
        limit: 10,
        count: 0,
        results: []
    });

    useEffect(() => {
        if (data.count <= 0) {
            getLocalItems().then(data => {
                setData(data);
            });
        }
    }, [])

    useEffect(() => {
        if (data && data?.count > 0) {
            storePokemonList(data);
            // toast(
            //     (t) => (
            //         <Stack direction="horizontal" gap={3}>
            //             {data.results?.length} Rows retrieved from dexie
            //             <Button variant="success" onClick={() => {
            //                 console.log("exporting db");
            //                 if (data.count > 0) {
            //                     setIsLoading(true);
            //                     exportDB(data);
            //                     setIsLoading(false);
            //                 }
            //             }} >export</Button>
            //         </Stack>

            //     ),
            //     {
            //         id: "rows",
            //         icon: <img src="/pokeball.svg" width={30} height={30} />,
            //         position: "bottom-right",
            //         duration: Infinity,
            //     }
            // );
        }
    }, [data])

    const getLocalItems = async () => {
        var res = await db.pokemonlist
            .where("id")
            .equals(0)
            .first();


        if (res && res?.count > 0) return res;
        else return JsonDB;
    };

    const storePokemonList = async (obj) => {
        const pkl = {
            id: 0,
            count: obj?.count || 0,
            limit: obj.limit,
            results: obj?.results || [],
            date_created: Date().toLocaleString(),
        };

        const id = await db.pokemonlist.put(pkl);
        console.info(`Rows Stored : ${pkl.results.length} rows - id ${id}`);
    };

    return <>

        <Component {...pageProps} limit={data?.limit} count={data?.count} offset={data?.results?.length} />

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
    </>
}