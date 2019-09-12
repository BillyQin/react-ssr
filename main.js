const cp = require('child_process');
const fs = require('fs');
const { getHtml } = require('./server/spiders');

// const urlLists = [
//   { name: 'zhihu', chinese: '知乎', url: 'https://daily.zhihu.com/', content: [] }
// ]

function writeFile(content) {
  fs.writeFile('./mock/zhihu.json', content, (err) => {
    if (err) {
      throw err;
    }
    console.log('write file finish');
  });
}


async function main() {
  const res = [];
  const $ = await getHtml('https://daily.zhihu.com');
  const { length } = $('.wrap .box');
  for (let i = 0; i < length; i += 1) {
    const title = $('.wrap .title').eq(i).text();
    const link = `https://daily.zhihu.com${$('.wrap .link-button').eq(i).attr('href')}`;
    res.push({ title, link });
  }
  writeFile(JSON.stringify(res));
  cp.fork('./dist/server.js');
}


main();
