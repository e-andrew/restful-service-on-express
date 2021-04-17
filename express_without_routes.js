const express = require("express");
const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(logger)

const books = [
    {id: 1, name: 'book1'},
    {id: 2, name: 'book2'},
    {id: 3, name: 'book3'}
]

app.get('/', (req, res) => {
    res.send("Hello World!");
});


app.get('/api/books', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with given id is not found');
    res.send(book);
});

app.post('/api/books', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send("You should give book name")
        return;
    }
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.send(book);
});

app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with given id is not found');
    if (!req.body.name) res.status(400).send("You should give book name");
    book.name = req.body.name;
    res.send(book);
    });


app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with given id is not found');

    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});


function logger(req, res, next) {
    console.log("Middleware request on express...");
    next();
};


app.listen(port, () => console.log(`Listening on port ${port}...`))
