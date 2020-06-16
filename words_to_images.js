const imageSearch = require('image-search-google');
const download = require('image-downloader');
const axios = require('axios')
var unirest = require("unirest");
const keyWords = require('./keyWords');
const lyrics = require('./lyrics')


const client = new imageSearch('017687177815629333739:i4nzriafju8', 'AIzaSyBVsb-vJzAIO2VPjRe2LHNl6R-UKUqkKUc');
const options = {size: "xxlarge"};
image_url = "";

async function getImageUrl(word){
    try{
        image_url = (await client.search(word, options))[0];
        console.log(image_url);
        return image_url;
    }
    catch(err){
        console.log(err)
    }
}


async function saveImages(singer, song) {
  try{
    lyricData = await lyrics.getLyrics(singer, song);
    lyric = lyricData.body.content[0].lyrics
    singer =  String(lyricData.body.content[0].title).split("by")[1] || "";
    song =  String(lyricData.body.content[0].title).split("by")[0] || "";
    console.log(song);
    wordSet = await keyWords.extractKeyWords(lyric, 10);
    wordSet.add(song)
    wordSet.add(singer)
    console.log(wordSet)
  }
  catch(e){
    console.log(e);
  }
    
    for (word of wordSet){   
        console.log(word)
        image_url = await getImageUrl(word)
        console.log(image_url)
        const options = {
            url: image_url['url'],
            dest: '/home/snir/WorkSpace/min-projects/Digital-humanities/pictures/'
          }
            try {
              const { filename, word } = await download.image(options)
              console.log(filename) // => /path/to/dest/image.jpg
            } catch (e) {
              console.error(e)
            }
    }
}

// console.log(text);

exports.saveImages = saveImages;
// saveImages("R.E.M", "Losing My Religion")



// const options = {
//     url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
//     dest: '/home/snir/WorkSpace/min-projects/Digital-humanities/pictures/'
//   }
   
//   async function downloadIMG() {
//     try {
//       const { filename, image } = await download.image(options)
//       console.log(filename) // => /path/to/dest/image.jpg
//     } catch (e) {
//       console.error(e)
//     }
//   }
   
//   downloadIMG()