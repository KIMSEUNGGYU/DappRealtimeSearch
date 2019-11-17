const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get('https://www.naver.com/');
  } catch (error) {
    consol.error(error);
  }
};
getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $('div.ah_roll_area ul')
      .children('li.ah_item')
      .children('a');

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        rank: $(this)
          .find('span.ah_r')
          .text(),
        keyword: $(this)
          .find('span.ah_k')
          .text(),
      };
    });

    const data = ulList.filter(r => r.rank);
    return data;
    // console.log(ulList);
  })
  .then(res => log(res));
