const pexels = require("pexels");
const download = require("image-downloader");
const client = pexels.createClient(
  "563492ad6f9170000100000151cbe8c4dddb41b39e41b29c6613419e"
);

const query = "baby";

function getImageURL(query) {
  return client.photos.search({ query, per_page: 1 }).then((photos) => {
    return photos.photos[0].src.original;
  });
}

async function printLink() {
  ans = await getImageURL("baby");
  console.log(ans);
}

exports.getImageURL = getImageURL;
