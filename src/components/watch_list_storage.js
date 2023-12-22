import WatchList_item from "./watch_list_item";

function Watchlist_storage(props) {
    // console.log(props.results)
    return props.results.map( (info) => {
        return <WatchList_item id={info} />
    });
}   

export default Watchlist_storage;