var request = require('request');
var DomParser = require('dom-parser');
var parser = new DomParser();

function makeOptions() {
    const uriJson = {
        google:
            'https://trends.google.com/trends/trendingsearches/daily?geo=KR',
        naver: 'https://naver.com',
    };

    if (process.argv[2].includes('google')) {
        name = 'google';
        options = {
            uri: uriJson.google,
            method: 'GET',
        };
    } else if (process.argv[2].includes('naver')) {
        name = 'naver';
        options = {
            uri: uriJson.naver,
            method: 'GET',
        };
    }
    return getPageHTML(options, name);
}

function getPageHTML(options, name) {
    request.get(options, function(error, response, body) {
        if (error) {
            return `Check Error : ${error}`;
        }
        if (response.statusCode == 200) {
            let doc = parser.parseFromString(body, 'text/html');
            console.log(doc);
            let docs = doc.rawHTML.split('\n');

            if (name == 'google') {
                return parsingGoogle(docs);
            } else if (name == 'naver') {
                return parsingNaver(docs);
            }
        } else {
            return response.statusCode;
        }
    });
}

function parsingNaver(docs) {
    let keys = [];
    let values = [];
    docs.forEach(element => {
        if (element.includes('class="ah_r"')) {
            key = element
                .replace('<span class="ah_r">', '')
                .replace('</span>', '');
            keys.push(key);
        } else if (element.includes('class="ah_k"')) {
            value = element
                .replace('<span class="ah_k">', '')
                .replace('</span>', '');
            values.push(value);
        }
    });
    console.log(keys);
    console.log(values);
}
function parsingGoogle(docs) {
    let keys = [];
    let values = [];
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
//             keys = [];
//             values = [];

//             docs.forEach(element => {
//                 if (element.includes('class="ah_r"')) {
//                     key = element
//                         .replace('<span class="ah_r">', '')
//                         .replace('</span>', '');
//                     keys.push(key);
//                 } else if (element.includes('class="ah_k"')) {
//                     value = element
//                         .replace('<span class="ah_k">', '')
//                         .replace('</span>', '');
//                     values.push(value);
//                 }
//             });
//             console.log(keys);
//             console.log(values);
//         }
//     });
// }

// getPageHTML();
