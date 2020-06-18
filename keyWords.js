
const axios = require('axios')
type = module;

async function extractKeyWords(text, numsOfKeys) {
  const ans = new Set()
  for (i = 1; i <= 3; i++) {
    const { data } = await axios.get(`http://yake.inesctec.pt/yake/v2/extract_keywords`, {
      params: {
        content: text,
        max_ngram_size: i,
        number_of_keywords: numsOfKeys,
        highlight: true
      }
    })
    console.log(text);
    console.log("\n");
    for (ngram of data.keywords) {
      if ((["verse", "whoa", "chorus", "outro", "Chorus", "Interlude", "intro", "pre-chorus"]. includes(String(ngram.ngram).toLowerCase()))) {

      }
      else {
        console.log(ngram.ngram);
        ans.add(ngram.ngram);
        if(ans.size >= 6){
          break;
        }
      }
    }
  }
  return ans
}

exports.extractKeyWords = extractKeyWords;


