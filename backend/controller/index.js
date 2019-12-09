const { naverCrawling } = require('../crawler');
const Naver = require('../model/naver');

async function getHome(req, res, next) {
  const naverCrawlingData = await naverCrawling();

  res.render('index', {
    title: '네이버 크롤링',
    crawlingData: naverCrawlingData,
  });

  // db 에 데이터 설정?
  const naverData = new Naver({
    date: new Date(),
    data: naverCrawlingData,
  });

  // db 에 데이터 넣기
  naverData.save((err, data) => {
    if (err) return console.err('err', err);
    else console.log('data', data);
  });
}

module.exports = {
  getHome,
};
