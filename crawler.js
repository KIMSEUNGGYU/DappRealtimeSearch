const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get('https://www.naver.com/');
  } catch (error) {
    console.error(error);
  }
};

getHtml().then(html => {
  let dataList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('div.ah_roll ul')
    .children('li.ah_item')
    .children('a');

  $bodyList.each(function(index, element) {
    dataList[index] = {
      rank: $(this)
        .find('span.ah_r')
        .text(),
      keyword: $(this)
        .find('span.ah_k')
        .text(),
    };
  });

  console.log(dataList);
});
