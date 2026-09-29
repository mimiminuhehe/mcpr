const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// 모든 도메인(GitHub Pages, 태블릿 등)에서의 접근 허용
app.use(cors());

app.get('/proxy', async (req, res) => {
    try {
        const targetUrl = req.query.url;
        if (!targetUrl) return res.status(400).send('URL이 필요합니다.');

        const response = await axios({
            method: 'get',
            url: targetUrl,
            responseType: 'stream'
        });

        response.data.pipe(res);
    } catch (err) {
        res.status(500).send(`Proxy Error: ${err.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
