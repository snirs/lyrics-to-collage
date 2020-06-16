var unirest = require("unirest");


async function getLyrics(singer, song) {

  var req = unirest("GET", `https://canarado-lyrics.p.rapidapi.com/lyrics/${singer} ${song}`);

  req.headers({
    "x-rapidapi-host": "canarado-lyrics.p.rapidapi.com",
    "x-rapidapi-key": "d9cc4c4402msh8da98570069a22ep1eacddjsnd7a9d16f162f",
    "useQueryString": true
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
  });

  return req.send()
}


// console.log(getLyrics("Dennis Lloyd", "NeverMind"));

exports.getLyrics = getLyrics;
