const  express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const url = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=budget&selectFields=poster&notNullFields=id&sortField=id&sortField=name&sortType=1&sortType=-1&type=movie&token=0VQXHBN-5JMMWFP-GWRJC8N-Z7JKC3P';

app.use(express.json());
app.get('', (req, res) => {
    res.send('Hello World!!!');
})
app.get('/top250', async(req, res) => {
    try {
        const response = await axios.get(url);
        const films = response.data.docs;
        console.log(films.length);

        const fileToPath = path.join(__dirname, './files/top250.json');
        fs.writeFile(fileToPath, JSON.stringify(films, null, 4), () => {});
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})
app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
})