const https = require('https');

https.get('https://mental-math.rahulsir.co.in/api/debug/env', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);

    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        try {
            console.log('BODY:', JSON.parse(body));
        } catch (e) {
            console.log('BODY (raw):', body.substring(0, 500));
        }
    });
}).on('error', (e) => {
    console.error(e);
});
