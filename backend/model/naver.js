const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class naverDB {
  constructor() {
    this.naverSchema = new Schema(
      { date: Date, data: Array },
      { collection: 'naver' },
    );

    this.model = mongoose.model('naver', this.naverSchema);
  }
  insertCrawlingData(crawlingData) {
    const naverData = this.model({ date: new Date(), data: crawlingData });
    naverData.save((err, data) => {
      if (err) return console.err('err', err);
      else console.log('data', data);
    });
  }

  findAllData() {
    this.model.find(function(err, allData) {
      allData.forEach(dataDict => {
        const { data, date } = dataDict;
        // console.log('date', date);
        console.log();
        console.log('data', data);
      });
    });
  }
}

module.exports = {
  naver: new naverDB(),
};
