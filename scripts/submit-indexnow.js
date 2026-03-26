/**
 * IndexNow Backend Submission Script
 * Run this script via Node.js to submit new or updated URLs to search engines via IndexNow.
 * 
 * Usage:
 * node scripts/submit-indexnow.js https://naveenweb.site/new-page https://naveenweb.site/updated-page
 */

const https = require('https');

const API_KEY = 'e6361573d6214698bda221ec1950ef0e';
const HOST = 'naveenweb.site'; // Update to actual domain
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const ENDPOINT = 'api.indexnow.org';

// Get URLs from command line arguments
const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log('Please provide at least one URL to submit.');
  console.log('Example: node scripts/submit-indexnow.js https://naveenweb.site/about https://naveenweb.site/services');
  process.exit(1);
}

const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
});

const options = {
  hostname: ENDPOINT,
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    switch (res.statusCode) {
      case 200:
      case 202:
        console.log(`\x1b[32mSuccess: URLs successfully submitted to IndexNow (Status ${res.statusCode}).\x1b[0m`);
        console.log(`Submitted URLs:\n - ${urls.join('\n - ')}`);
        break;
      case 400:
        console.error('\x1b[31mError 400 (Bad Request):\x1b[0m Invalid format.');
        break;
      case 403:
        console.error('\x1b[31mError 403 (Forbidden):\x1b[0m Key not valid (key not found, file found but key not in the file).');
        break;
      case 422:
        console.error('\x1b[31mError 422 (Unprocessable Entity):\x1b[0m URLs don\'t belong to the host or the key is not matching the schema in the protocol.');
        break;
      case 429:
        console.error('\x1b[31mError 429 (Too Many Requests):\x1b[0m Too Many Requests (potential Spam).');
        break;
      default:
        console.error(`\x1b[31Error ${res.statusCode}:\x1b[0m Unexpected error occurred.`);
    }
  });
});

req.on('error', (error) => {
  console.error('\x1b[31mFailed to submit to IndexNow:\x1b[0m', error.message);
});

req.write(payload);
req.end();
