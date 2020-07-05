
const pexels = require('pexels');
const download = require('image-downloader');
const client = pexels.createClient('563492ad6f9170000100000151cbe8c4dddb41b39e41b29c6613419e');

const query = 'baby';

function getImageURL(query){
    return client.photos.search({ query, per_page: 1 }).then(photos => {
        return photos.photos[0].src.original
   
   });
} 



// async function pexels_download(word) {
//     image_url = await getImageURL(word)
//     console.log(image_url);
//     const options = {
//       url: image_url,
//       dest: './pictures/'
//     }
//     try {
//       const { filename, word } = await download.image(options)
//       console.log(filename) // => /path/to/dest/image.jpg
//     } catch (e) {
//       console.log(e)
//     }
//   }

async function printLink(){
    ans = await getImageURL("baby");
    console.log(ans)
}

// printLink()
exports.getImageURL = getImageURL;
// console.log(ref);




// async function test(){
//     temp = await client.photos.search("dog")
//     console.log(temp);
// }
// test();