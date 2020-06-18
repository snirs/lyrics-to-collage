const axios = require('axios')
type = module;


async function getImage(query) {
  try {
    const { data } = await axios.get(`https://api.qwant.com/api/search/images`, {
      params: {
        count: 4,
        q: query,
        t: 'images',
        safesearch: 1,
        locale: 'en_US',
        uiv: 4
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
      }
    })
    // console.log(data.data.result.items[0].media);
    return data.data.result.items[0].media;
  }
  catch (e) {
    console.log(e);
  }
}


exports.getImage = getImage;