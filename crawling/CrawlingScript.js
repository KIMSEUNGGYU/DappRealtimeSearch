const request = require('request');
const DomParser = require('dom-parser');
const moment = require('moment');
const parser = new DomParser();
const now = new Date();

function makeOptions() {
    const uriJson = {
        // google:'https://trends.google.com/trends/trendingsearches/daily?geo=KR',
        naver: 'https://naver.com',
    };

    const options = {};
    const hostname = process.argv[2];
    if (!uriJson[hostname]) {
        throw new Error(`${hostname} is not in uri json properties`);
    }

    options.uri = uriJson[hostname];
    options.method = 'GET';

    return getPageHTML(options, hostname);
}

function getPageHTML(options, hostname) {
    request.get(options, function(error, response, body) {
        if (error) {
            return `Check Error : ${error}`;
        }
        if (response.statusCode == 200) {
            let docs = parser
                .parseFromString(body, 'text/html')
                .rawHTML.split('\n');
            if (hostname === 'naver') {
                return parsingNaver(hostname, docs);
            }
        } else {
            return response.statusCode;
        }
    });
}

function parsingNaver(hostname, docs) {
    let result = {};
    let data = [];
    let count = 0;

    docs.map(function(element, index) {
        if (count >= 20) {
            return null;
        }
        if (element.includes('class="ah_k"')) {
            count += 1;
            let rank = count;
            let keyword = element
                .replace('<span class="ah_k">', '')
                .replace('</span>', '');
            data.push({
                rank: count,
                keyword: keyword,
            });
        }
    });

    result['hostname'] = hostname;
    result['data'] = data;
    result['date'] = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log(result);
}
makeOptions();

result = {
    host: '',
    data: [{}, {}],
    time: {},
};
