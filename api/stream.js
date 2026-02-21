const app = require('express')();
const axios = require('axios');

app.get('/', async (req, res) => {
    const channelId = req.query.id || 'tamasha-life-hd';
    const targetUrl = `https://tamashaweb.com/live-tv/${channelId}`;

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://tamashaweb.com/',
            }
        });

        const regex = /"(https?:\/\/[^"]+\.m3u8[^"]*wmsAuthSign[^"]*)"/;
        const match = response.data.match(regex);

        if (match && match[1]) {
            res.redirect(match[1].replace(/\\\//g, '/'));
        } else {
            res.status(404).send('Stream link not found.');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = app;