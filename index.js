const  express = require('express');
const { filmsRouter } = require('./routers/films');

const app = express();
const PORT = 3000;

const handlers = {
    // '/api/films/readall' : readAllFilms,
    // '/api/films/read' : readFilmById,
    // '/api/films/create' : addNewFilm,
    // '/api/films/update' : updateFilmById,
    // '/api/films/delete' : deleteFilmById
}
app.use(express.json());
app.get('', (req, res) => {
    res.send('Hello World!!!');
})
app.use('/getTop250', filmsRouter);
app.use('/api', filmsRouter);
app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
})
