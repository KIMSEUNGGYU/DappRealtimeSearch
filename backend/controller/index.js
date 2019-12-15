const { naverCrawling } = require('../crawler');
const { naver } = require('../model/naver');

async function getHome(req, res, next) {
  const naverCrawlingData = await naverCrawling();

  // db 에서 모든 데이터 가져오는 코드
  // naver.findAllData();

  // db 에 데이터 넣기
  // naver.insertCrawlingData(naverCrawlingData);

  res.render('index', {
    title: '네이버 크롤링',
    crawlingData: naverCrawlingData,
    date: new Date(),
  });
}

module.exports = {
  getHome,
};
