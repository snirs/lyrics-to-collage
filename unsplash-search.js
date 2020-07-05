const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const axios = require('axios')
const { toJson } = require("unsplash-js")
// import Unsplash, { toJson } from "unsplash-js"; 


const unsplash = new Unsplash({
    accessKey: "S63WHdahYT9CzDgLSHa_EyEetvbyt-9nhn0EuapWCx8",
    // Optionally you can also configure a custom header to be sent with every request
    headers: {
        "X-Custom-Header": "foo"
    },
    // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
    timeout: 1000 // values set in ms
});


async function getImageURL(word) {
    try{
        let data = "";
    const image_url = await unsplash.search.photos(word, 1, 1, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            json.results;
            // console.log(json.results[0].urls.regular);
            data =  json.results[0].urls.regular;
        });

    return data;
    }
    catch(e){
        console.log(e);
    }
}

// getImageURL("wolf")
exports.getImageURL = getImageURL;

