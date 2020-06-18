const imageSearch = require('image-search-google');
const download = require('image-downloader');
const keyWords = require('./keyWords');
const lyrics = require('./lyrics');
const unsplash = require('./unsplash-search');
const googleSearch = require('./google-search');
const imageSearchGoogle = require('image-search-google');


const client = new imageSearch('017687177815629333739:i4nzriafju8', 'AIzaSyBVsb-vJzAIO2VPjRe2LHNl6R-UKUqkKUc');
const options = {page: 1, size: "xxlarge"};
image_url = "";

async function getImageUrl(word) {
  try {
    image_url = (await client.search(word, options))[0];
    console.log(image_url);
    return image_url;
  }
  catch (err) {
    console.log(err)
  }
}

async function saveImages(singer, song) {
  try {
    lyricData = await lyrics.getLyrics(singer, song);
    lyric = lyricData.body.content[0].lyrics
    singer = String(lyricData.body.content[0].title).split("by")[1] || "";
    song = String(lyricData.body.content[0].title).split("by")[0] || "";
    console.log(song);
    GoogleSet = new Set();
    unsplashSet = await keyWords.extractKeyWords(lyric, 10);
    GoogleSet.add(song + singer + " single");
    GoogleSet.add(singer);
    console.log(unsplashSet, GoogleSet);
  }
  catch (e) {
    console.log(e);
  }
  
  for (word of GoogleSet) {
    console.log(word);
    google_download(word);
  }

  for (word of unsplashSet) {
    console.log(word);
    unsplash_download(word);
  }

}

async function google_download(word) {
  let url = false
  image_url = await googleSearch.getImage(word)
  if (! image_url || image_url == undefined){
    url = true
    image_url = await getImageUrl(word)
  }
  console.log(image_url);
  if(url){
    image_url = image_url['url']
  }
  const options = {
    url: image_url,
    dest: './pictures/'
  }
  try {
    const { filename, word } = await download.image(options)
    console.log(filename) // => /path/to/dest/image.jpg
  } catch (e) {
    console.error(e)
  }
}

async function unsplash_download(word) {
  image_url = await unsplash.getImageURL(word)
  console.log(image_url);
  const options = {
    url: image_url,
    dest: './pictures/'
  }
  try {
    const { filename, word } = await download.image(options)
    console.log(filename) // => /path/to/dest/image.jpg
  } catch (e) {
    console.error(e)
  }
}

exports.saveImages = saveImages;

