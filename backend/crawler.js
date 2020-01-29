const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const URL = {
  naver: 'https://www.naver.com/',
};

/**
 * 요청을 통해 html 데이터 얻기
 * @param {string} hostname 크롤링하고자 하는 사이트 hostname
 */
const getHtml = async hostname => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto(URL[hostname], { waitUntil: 'networkidle2' });
  const html = await page.$eval('#NM_RTK_ROLLING_WRAP', e => e.outerHTML);
  browser.close();
  return html;
};

/**
 * 네이버 실시간 검색어를 크롤링해 rank, keyword object 배열 생성
 * @param {object} html 네이버 html 코드?
 */
const NAVERCrawling = async html => {
  const dataList = [];
  // const html = await getHtml();

  const $ = cheerio.load(html);
  const $tagList = $('.ah_l')
    .children('li.ah_item')
    .children('a');

  $tagList.each(function(index) {
    dataList[index] = {
      rank: $(this)
        .find('span.ah_r')
        .text(),
      keyword: $(this)
        .find('span.ah_k')
        .text(),
    };
  });

  // 20 개 이하 데이터 맞추기
  while (true) {
    if (dataList.length <= 20) break;
    dataList.pop();
  }

  return dataList;
};

// 프로그램 시작
function naverCrawling() {
  return getHtml('naver').then(NAVERCrawling);
}

// 테스트 실행
// (async function main() {
//   const data = await naverCrawling();
//   console.log('data', data);
// })();

module.exports = {
  naverCrawling,
};
