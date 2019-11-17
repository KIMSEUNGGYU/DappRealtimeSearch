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
        options = {
            uri: uriJson.google,
            method: 'GET',
        };
    } else if (process.argv[2].includes('naver')) {
        options = {
            uri: uriJson.naver,
            method: 'GET',
        };
    }
    return options;
}
makeOptions();

function getPageHTML(options) {
    request.get(options, function(error, response, body) {
        if (error) {
            return `Check Error : ${error}`;
        }
        if (response.statusCode == 200) {
            let doc = parser.parseFromString(body, 'text/html');
            return doc;
        } else {
            return response.statusCode;
        }
    });
}

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
