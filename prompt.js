const prompts = require('prompts');
const words_to_images = require('./words_to_images');
let {PythonShell} = require('python-shell');


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
  await words_to_images.saveImages(artist, song)
  setTimeout(runPy,5000); // wait 10 sec and build collage from photos
})();

function runPy() {
    let options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './',
    };

    PythonShell.run('collage-maker.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log(results);
    });
}
