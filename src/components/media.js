import Single from "./media_single";

function Media(props) {
    // console.log(props.results)
    return props.results.map( (info) => {
        return <Single media={info} key={info['#IMDB_ID']} />
    });
}

export default Media;