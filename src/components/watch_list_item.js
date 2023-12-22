// react imports 
import { useEffect, useState } from "react";

import axios from "axios";

function WatchList_item(props) {
    // array of movie/show 
    const [id_info, setIDInfo] = useState([])

    // api that gets detailed information about the movie/show using id
    useEffect(() => {   
        axios.get(`https://search.imdbot.workers.dev/?tt=${props.id}`)
        .then((json) => {
            // console.log(json.data.short);
            setIDInfo(json.data.short);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    // api call that removes id from watchlist array
    let remove_watchlist = (id) => {
        axios.put(`http://localhost:4000/remove/watchlist`, id)
        .then((res) => {
            
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            <button 
                id={`${props.id}`}
                className="poster_btn" 
                onDoubleClick={(e) => { 
                    let media_id = {
                        id: e.target.id
                    }
                    remove_watchlist(media_id);
                    
                    // show popup message for 3 seconds, disappear and reload the page
                    let container = document.getElementById("watchlist_message_container");
                    container.classList.add('show');
                    setTimeout(() => {
                        container.classList.remove('show');
                        window.location.reload()
                    }, 3000);
                }}
            >
            
                <img 
                    className="poster"
                    id={`${props.id}`}
                    src={`${id_info.image}`}
                    alt={`${id_info.name} poster`}
                    title={`${id_info.name}`} 
                />

            </button>
            
            {/* Popup box */}
            <div id="watchlist_message_container" className={`watchlist_message_container`}>
                <div className="watchlist_message">
                    <h4 className="message">❌ Successfully removed from Watchlist!</h4>
                </div>
            </div>
        </>
    )
}

export default WatchList_item;