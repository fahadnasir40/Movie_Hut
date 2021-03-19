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
const { Cinema } = require("./models/cinema");
const { Showtime } = require("./models/showtime");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));


// GET //

app.get('/api/saveMovie', (req, res) => {

    var dataToSend;
    // spawn new child process to call the python script

    title = String(req.query.title);
    //variables file name, movie name, api key
    const python = spawn('python', ['tmdb.py', "Deadpool", config.TMDB_API_KEY]);

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


app.get("/api/auth", auth2, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

//GET

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
app.post('/api/create-cinema',(req, res)=>{
    console.log(req.body)
    const cinema = new Cinema(req.body);
    cinema.save((error, cinema)=>{
        if(error) {
            console.log(error)
            return res.status(400).send(error);
        }
        res.status(200).json({
            post: true,
            cinemaId: cinema._id
        })
    });
})

app.post('/api/create-showtime',(req, res)=>{
    const showtime = new Showtime(req.body);
    showtime.save((error, showtime)=>{
        if(error) return res.status(400).send(error);
        res.status(200).json({
            post: true,
            showtimeId: showtime._id
        })
    });
})

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
