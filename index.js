const express = require('express');

const app = express();
const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let movies = [
    {
        id:"1",
        title:"Avengers",
        Director:"Kevin Fiege"
    },
    {
        id:"2",
        title:"Spider-Man",
        Director:"Stan-Lee"
    },
];

//get movie list in JSON
app.get("/:movies", (req,res) =>{
    res.json(movies);
});

// add movie to list
app.post("/:movie",(req,res) =>{
    const movie = req.body;

    console.log(movie);
    movies.push(movie);

    res.send("Movie is added to list");
});

//search for a movie in the list
app.get('/movie/:id',(req,res) =>{
    const id = req.params.id;

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            return
        }
    }
    res.status(404).send('Movie not found')
});

//delete movie from list
app.delete('/movie/:id', (req,res) =>{
    const id = req.params.id;

    movies = movies.filter((movie) =>{
        if(movie.id !== id){
            return true;
        }
        return false;
    });
    res.send("Movie is deleted");
});

//set server to listen at port
app.listen(port, () => console.log('Server listening at port 3000'));
     
