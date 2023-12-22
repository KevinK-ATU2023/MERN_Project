// react imports
import { useEffect, useState } from "react";

import axios from "axios";

// my components
import Navigation from "./navigation";
import Watchlist_storage from "./watch_list_storage";

import './watch_list.css'

function WatchList() {
    const [watchlist, setWatchlist] = useState([]);

    // api call that gets account watchlist
    useEffect(() => {
        axios.get('http://localhost:4000/signin/account')
        .then((res) => {
            setWatchlist(res.data.watchlist)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    return(
        <>
            <Navigation />
            <div className="results">
                <Watchlist_storage results={watchlist} />
            </div>
        </>
    )
}

export default WatchList;