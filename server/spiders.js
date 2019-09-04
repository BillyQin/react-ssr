const cheerio  = require('cheerio');
const superagent = require('superagent'); // ajax使用的http库

const getHtml = (url) => {
  return new Promise((resolve, reject) => {
    superagent
    .get(url)
    .end((err, res) => {
      resolve(cheerio.load(res['text']));
      if (err) {
        console.log(url, err);
        reject(err);
      }
    });
  })
}

module.exports = {
  getHtml
}