const axios = require('axios');
const cheerio = require('cheerio');

const URI = {
  naver: 'https://www.naver.com/',
};

/**
 * 요청을 통해 html 데이터 얻기
 * @param {string} hostname 크롤링하고자 하는 사이트 hostname
 */
const getHtml = async hostname => {
  try {
    return await axios.get(URI[hostname]);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 네이버 실시간 검색어를 크롤링해 rank, keyword object 배열 생성
 * @param {object} html 네이버 html 코드?
 */
const NAVERCrawling = html => {
  let dataList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('div.ah_roll ul')
    .children('li.ah_item')
    .children('a');

  $bodyList.each(function(index) {
    dataList[index] = {
      rank: $(this)
        .find('span.ah_r')
        .text(),
      keyword: $(this)
        .find('span.ah_k')
        .text(),
    };
  });
  return dataList;
};

// 프로그램 시작
function naverCrawling() {
  return getHtml('naver').then(NAVERCrawling);
}

module.exports = {
  naverCrawling,
};
