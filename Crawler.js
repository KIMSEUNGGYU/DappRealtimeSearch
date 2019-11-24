// Library Set
const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

// NAVER Crawling
const getHtml = async () => {
  try {
    return await axios.get('https://www.naver.com/');
  } catch (error) {
    consol.error(error);
  }
};

function getNaver() {
  return getHtml().then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $('div.ah_roll_area ul')
      .children('li.ah_item')
      .children('a');

    $bodyList.each(function(i, elem) {
      ulList[i] = [
        $(this)
          .find('span.ah_r')
          .text(),
        $(this)
          .find('span.ah_k')
          .text(),
      ];
    });

    const data = ulList;
    //log(data);
    return data;
  });
}
//.then(res => log(res));

function resCrawling() {
  //console.log(getNaver());
  return getNaver();
}

module.exports = resCrawling;
