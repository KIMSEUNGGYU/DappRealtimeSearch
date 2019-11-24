function getHome(req, res, next) {
  res.render('index', {title: '네이버 크롤링'});
}

module.exports = {
  getHome,
};
