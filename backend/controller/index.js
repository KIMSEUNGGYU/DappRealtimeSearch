const {naverCrawling} = require('../../crawler');

async function getHome(req, res, next) {
  const naverCrawlingData = await naverCrawling();

  res.render('index', {
    title: '네이버 크롤링',
    crawlingData: naverCrawlingData,
  });
}

module.exports = {
  getHome,
};
