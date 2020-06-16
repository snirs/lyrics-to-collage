const prompts = require('prompts');
const words_to_images = require('./words_to_images');


 
const questions = [
  {
    type: 'text',
    name: 'artist',
    message: 'Please Enter Artist Name?'
  },
  {
    type: 'text',
    name: 'song',
    message: 'Enter The Song Name',
  }
];
 
(async () => {
  const response = await prompts(questions);
  console.log(response.artist, response.song);
  artist = response.artist;
  song = response.song;
  words_to_images.saveImages(artist, song)
 
  // => response => { username, age, about }
})();