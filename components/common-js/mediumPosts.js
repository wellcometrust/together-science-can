const https = require('https');

const fetchMediumPosts = () => {
  console.log('im loaded');
  https.get('http://dev.wmdev.ratliffe/ajax/tsc-latest-content.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
};

export default fetchMediumPosts;
