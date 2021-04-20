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
const fs = require('fs')



// GET //

function saveMovie(title) {

    var dataToSend, err;
    // spawn new child process to call the python script

    title = String(title);

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

                if (error) {
                    err = error;
                    return err;
                }

                return true;
                // res.status(200).json({
                //     post: true,
                //     movie: document
                // })
            });
        }
        catch {
            return false;
            // res.status(404).send("Error in movie");
        }
    });
}

app.post('/api/create-showtime', (req, res) => {
    const showtime = new Showtime(req.body);

    if (saveMovie(showtime.name)) {
        showtime.save((error, showtime) => {
            if (error) return res.status(400).send(error);
            res.status(200).json({
                post: true,
                showtimeId: showtime._id
            })
        });
    }
    else {
        res.status(400).send("Error creating showtime")
    }


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

app.get('/api/getCinemasList', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Cinema.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCinemaMovies', (req, res) => {

    // let skip = parseInt(req.query.skip);
    // let limit = parseInt(req.query.limit);
    // let order = req.query.order;
    let id = req.query.id

    // // ORDER = asc || desc
    Cinema.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        if (doc.moviesList) {
            if (doc.moviesList.length > 0)
                Movie.find({ _id: { $in: doc.moviesList } }).select('_id movieId poster_url title runtime videoLinks releaseDate background_url description rating title ').exec((err, movies) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).send({ movies });
                });
        }
    })
})


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


app.get('/api/getCinemaMovieShowtimes', (req, res) => {
    Showtime.find({ cinemaId: req.query.cinemaId, movieId: req.query.movieId }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            showtime: doc,
        })
    })
})

app.get('/api/getMovieTMDB', (req, res) => {

    var dataToSend, err;
    // spawn new child process to call the python script

    title = String(req.query.name);

    //variables file name, movie name, api key
    const python = spawn('python', ['./server/tmdb-api/tmdb.py', title, config.TMDB_API_KEY]);

    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...',);

        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        try {
            var movieObject = JSON.parse(dataToSend);
            const movie = new Movie(movieObject);
            return res.status(200).send({ movie, found: true, tmdb: true });
        }
        catch {
            return res.status(404).json({ message: "Error getting movie info TMDB.", found: false });
        }
    });
})

app.get('/api/getMovieByName', (req, res) => {
    // Movie.findOne({ title: { $regex: '.*' + req.query.name + '.*' } }, (err, doc) => {
    Movie.findOne({ title: req.query.name }, (err, doc) => {
        if (err) return res.status(400).send(err);

        if (doc == null) {
            res.json({
                movie: doc,
                found: false,
            })
        }
        else {
            res.json({
                movie: doc,
                found: true,
            })
        }
    });
})

//POST
app.post('/api/create-cinema', (req, res) => {

    const cinema = new Cinema(req.body);
    cinema.save((error, cinema) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error);
        }
        res.status(200).json({
            post: true,
            cinemaId: cinema._id
        })
    });
})

app.post('/api/addMovieInCinema', (req, res) => {

    let movieData = req.body;

    Cinema.findByIdAndUpdate(movieData.cinemaID, { $addToSet: { moviesList: movieData.movie._id } },
        function (err, docs) {
            if (err) {
                console.log(err)
                return res.status(400).json(err);
            }
            else {
                if (movieData.tmdb === true) {
                    const movie = new Movie(movieData.movie);
                    return movie.save((error, document) => {
                        if (error) {
                            console.log(err)
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({
                            post: true,
                            movie: true,
                            cinema: true
                        })
                    });
                }
                else {
                    return res.status(200).json({
                        post: true,
                        cinemaId: docs._id
                    })
                }
            }
        });
})

app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
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
