const axios = require("axios");
const express = require('express');
const filmsRouter = express.Router();
const path = require("path");
const fs = require("fs");

let movies = [];
const url = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=budget&selectFields=poster&notNullFields=id&sortField=id&sortField=name&sortType=1&sortType=-1&type=movie&token=0VQXHBN-5JMMWFP-GWRJC8N-Z7JKC3P';

filmsRouter.get('/', async(req, res) => {
    try {
        const response = await axios.get(url);
        const films = response.data.docs;
        movies = films;

        const fileToPath = path.join(__dirname, './files/top250.json');
        fs.writeFile(fileToPath, JSON.stringify(films, null, 4), () => {});
        res.status(200).send('Movies are downloaded!')
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})
filmsRouter.get('/films/readall',(req, res) => {
    const sortedMovies = movies.sort((a, b) => a.id - b.id);
    res.status(200).send(sortedMovies);
})
filmsRouter.get('/films/read', (req, res) =>{
    const { id } = req.query;
    console.log(id);
    let filmById = movies.filter(item => item.id === Number(id));
    console.log(filmById);
    if (filmById) {
        return res.status(200).send(filmById);
    } else {
        return res.status(404).send('Film not found');
    }
})

module.exports = {
    filmsRouter
}