import { useState } from 'react';

import axios from 'axios';

import './media_single.css'

function Single(props) {

    // api call that adds id to account array or temporary array
    let add_to_watchlist = (id) => {
        axios.put('http://localhost:4000/add/watchlist', id)
        .then((res) => {
            
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            <button 
                id={`${props.media['#IMDB_ID']}`}
                className="poster_btn" 
                onDoubleClick={(e) => {
                    let media_id = {
                        id: e.target.id
                    }
                    add_to_watchlist(media_id);

                    let container = document.getElementById("watchlist_message_container");
                    container.classList.add('show');
                    setTimeout(() => {
                        container.classList.remove('show');
                    }, 3000);
                }}
            >
            
                <img 
                    className="poster"
                    id={`${props.media['#IMDB_ID']}`}
                    src={props.media['#IMG_POSTER']}
                    alt={`${props.media['#TITLE']} poster`}
                    title={`${props.media['#TITLE']}`} 
                />

            </button>
            
            {/* popup message when user adds to watchlist */}
            <div id="watchlist_message_container" className={`watchlist_message_container`}>
                <div className="watchlist_message">
                    <h4 className="message">✅ Successfully added to Watchlist!</h4>
                </div>
            </div>
        </>
    )
}

export default Single;