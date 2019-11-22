const request = require('request');
const DomParser = require('dom-parser');
const parser = new DomParser();

function makeOptions() {
    const uriJson = {
        google:
            'https://trends.google.com/trends/trendingsearches/daily?geo=KR',
        naver: 'https://naver.com',
    };

    const options = {};
    const hostname = process.argv[2];

    if (uriJson[hostname]) {
        options.uri = uriJson[hostname];
        options.method = 'GET';
    } else {
        console.log(Error(`${hostname} is not in uri json properties`));
    }
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

            if (hostname == 'google') {
                return parsingGoogle(docs);
            } else if (hostname == 'naver') {
                return parsingNaver(docs);
            }
        } else {
            return response.statusCode;
        }
    });
}

function parsingNaver(docs) {
    let ranks = [];
    let keywords = [];
    docs.forEach(element => {
        if (element.includes('class="ah_r"')) {
            rank = element
                .replace('<span class="ah_r">', '')
                .replace('</span>', '');
            ranks.push(rank);
        } else if (element.includes('class="ah_k"')) {
            keyword = element
                .replace('<span class="ah_k">', '')
                .replace('</span>', '');
            keywords.push(keyword);
        }
    });
    console.log(ranks);
    console.log(keywords);
}
function parsingGoogle(docs) {
    let ranks = [];
    let keywords = [];
    docs.forEach(element => {
        // console.log(element);
        // if (element.includes('class="trending-feed-page-wrapper"')) {
        // console.log(element);
    });
}

makeOptions();

// function getPageHTML() {
//     // const options = {
//     //     uri: process.argv[2] || 'https://naver.com',
//     //     method: 'GET',
//     // };

//     request.get(options, function(error, response, body) {
//         if (error) {
//             console.log(`There is Error : ${error}`);
//         }
//         if (response.statusCode == 200) {
//             // console.log(response.body);
//             var doc = parser.parseFromString(body, 'text/html');
//             docs = doc.rawHTML.split('\n');
//             rank = [];
//             keywords = [];

//             docs.forEach(element => {
//                 if (element.includes('class="ah_r"')) {
//                     key = element
//                         .replace('<span class="ah_r">', '')
//                         .replace('</span>', '');
//                     rank.push(key);
//                 } else if (element.includes('class="ah_k"')) {
//                     value = element
//                         .replace('<span class="ah_k">', '')
//                         .replace('</span>', '');
//                     keywords.push(value);
//                 }
//             });
//             console.log(rank);
//             console.log(keywords);
//         }
//     });
// }

// getPageHTML();
