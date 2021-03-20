const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const moment = require("moment")
const { spawn } = require('child_process');


const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");
const { auth2 } = require("./middleware/auth2");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const { User } = require("./models/user");
const { Movie } = require("./models/movie");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));
const fs = require('fs')



// GET //

app.get('/api/saveMovie', (req, res) => {

    var dataToSend;
    // spawn new child process to call the python script

    title = String(req.query.title);

    //variables file name, movie name, api key
    const python = spawn('python', ['./server/tmdb-api/tmdb.py', title, config.TMDB_API_KEY]);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...',);

        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        try {
            var movieObject = JSON.parse(dataToSend);
            const movie = new Movie(movieObject);
            // console.log("Movie Info", movie);
            movie.save((error, document) => {
                if (error) return res.status(400).send(error);
                res.status(200).json({
                    post: true,
                    movie: document
                })
            });
        }
        catch {
            res.status(404).send("Error in movie");
        }
    });
})

//GET

app.get("/api/auth", auth2, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});


app.get('/api/getHomeMovies', (req, res) => {
    Movie.find({}).sort({ createdAt: -1 }).select('_id movieId poster_url title runtime videoLinks background_url description rating title').exec((err, doc) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            moviesList: doc
            // id: doc._id,
            // movieId: doc.movieId,
            // poster_url: doc.poster_url,
            // title: doc.title,
            // runtime: doc.runtime,
            // description: doc.description,
            // rating: doc.rating,
            // background_url: doc.background_url,
            // videoLinks: doc.videoLinks
        })
    })
})


app.get('/api/getMovieInfo', (req, res) => {

    let id = req.query.id;
    Movie.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            movie: doc,
        })
    })
})



//POST

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running at port: ${port}`);
});
