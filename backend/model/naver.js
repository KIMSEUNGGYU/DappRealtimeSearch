const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const naverSchema = new Schema(
  {
    date: Date,
    data: Array,
  },
  {
    collection: 'naver',
  },
);

module.exports = mongoose.model('naver', naverSchema);
