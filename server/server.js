const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const moment = require("moment")
const { spawn } = require('child_process');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");
const { auth2 } = require("./middleware/auth2");

const nodemailer = require('nodemailer');
const emailModule = require('./emails/emails');
const handlebars = require('handlebars');

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
const { Review } = require("./models/review");
const { ReviewReport } = require("./models/review_report");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.MOVIEHUT_EMAIL_AUTH_USER,
        pass: config.MOVIEHUT_EMAIL_AUTH_SECRET
    },
});


app.post('/api/forgotPassword', async (req, res, next) => {
    if (req.body.email === '') {
        res.send('email required');
    }
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (user === null) {
            res.send('email not in db');
        }
        else {
            const token = crypto.randomBytes(20).toString('hex');
            date = new Date();
            date.setHours(date.getHours() + 1)
            User.findOneAndUpdate({ email: req.body.email },
                { resetPasswordToken: token, resetPasswordExpires: date }, null, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {

                        const mailOptions = {
                            from: config.MOVIEHUT_EMAIL_AUTH_USER,
                            to: `${user.email}`,
                            subject: 'Link To Reset Password',
                            text:
                                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                                + `http://localhost:3000/reset/${token}\n\n`
                                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                        };

                        transporter.sendMail(mailOptions, (err, response) => {
                            if (err) {
                                console.error('there was an error: ', err);
                            }
                            else {
                                res.status(200).json('recovery email sent');
                            }
                        });
                    }
                });
        }
    });
});

app.get('/api/reset', (req, res) => {
    User.findOne({
        resetPasswordToken: req.query.resetPasswordToken,
    }).then((user) => {
        if (user == null) {
            res.send('password reset link is invalid or has expired');
        }
        else {
            d = new Date()
            if (user.resetPasswordExpires < d) {
                res.send('password reset link is invalid or has expired');
            }
            else {
                res.status(200).send({
                    resetPasswordToken: user.resetPasswordToken,
                    message: 'password reset link a-ok',
                });
            }
        }
    });
});

app.put('/api/updatePasswordViaEmail', (req, res) => {
    User.findOne({
        resetPasswordToken: req.body.resetPasswordToken
    }).then(user => {
        d = new Date()
        if (user == null) {
            res.status(403).send('password reset link is invalid or has expired');
        }
        else if (user.resetPasswordExpires < d) {
            res.status(403).send('password reset link is invalid or has expired');
        }
        else if (user != null) {
            bcrypt.genSalt(10, function (error, salt) {
                bcrypt.hash(req.body.password, salt, function (error, hash) {
                    if (error) return next(error);
                    User.findOneAndUpdate({ email: user.email },
                        {
                            resetPasswordToken: null,
                            resetPasswordExpires: null,
                            password: hash
                        }, null, function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.status(200).send({ message: 'password updated' });
                            }
                        });
                })
            }
            )
        }
    })
});

// GET //
app.get('/api/sendEmail', auth2, async (req, res) => {

})


function saveMovie(title, cinemaId) {

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
            movie.save((error, document) => {

                if (error) {
                    err = error;
                    return err;
                }

                Cinema.findByIdAndUpdate(cinemaId, { $addToSet: { moviesList: document._id } },
                    function (err, docs) {
                        if (err) {
                            return err;
                        }
                        return true;
                    })
            });
        }
        catch {
            return false;
            // res.status(404).send("Error in movie");
        }
    });
}

app.post('/api/create-showtime', auth2, (req, res) => {
    const showtime = new Showtime(req.body);

    showtime.save((error, showtime) => {

        if (error) {
            console.log(error);
            return res.status(400).send(error)
        };

        res.status(200).json({
            post: true,
            newShowtime: showtime
        })
    });
})


//GET

app.get("/api/auth", auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        dob: req.user.dob,
        role: req.user.role,
        favorites: req.user.favorites,
        showProfaneWords: req.user.showProfaneWords,
        error: false
    });
});

app.get('/api/getCinemasList', auth2, (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Cinema.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getReportsList', auth2, (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    ReviewReport.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        var reviews = doc.map((reports) => { return reports.reviewId });
        Review.find({ _id: { $in: reviews } }).exec((err, review) => { res.status(200).json({ reviewList: review, reportList: doc }) })
        // res.send(doc);
    })
})

app.get('/api/getCinemaMovies', auth2, (req, res) => {

    // let skip = parseInt(req.query.skip);
    // let limit = parseInt(req.query.limit);
    // let order = req.query.order;
    let id = req.query.id

    // // ORDER = asc || desc
    Cinema.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        if (doc.moviesList) {
            if (doc.moviesList.length > 0)
                Movie.find({ _id: { $in: doc.moviesList } }).select('_id movieId poster_url title runtime videoLinks releaseDate background_url description rating title ').sort({ createdAt: 'DESC' }).exec((err, movies) => {
                    if (err) return res.status(400).send(err);

                    return res.status(200).send({ movies });

                });
        }
    })
})



app.get('/api/getMoviesRunningInCinemas', (req, res) => {

    let id = req.query.cinemaId
    try {
        Cinema.findOne({ _id: id }).select('_id name city address url').exec((err, cinema) => {
            if (err) return res.status(400).send(err);

            const today = moment().startOf('day');
            Showtime.find({
                cinemaId: cinema._id, date: {
                    $gte: today.toDate(),
                    $lte: moment(today).add(14, "days").toDate()
                }
            }).select('_id cinemaId movieId date').exec((err, showtimes) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send(err)
                }

                var showData = [];
                var movieIds = showtimes.map(function (s) {
                    const show = {
                        movieId: s.movieId,
                        showtimeDate: s.date
                    }

                    showData.push(show);
                    return s.movieId
                });


                const moviesList = Movie.find({ _id: { "$in": movieIds } }).select('_id movieId poster_url title runtime releaseDate rating title ').exec();
                return moviesList.then(function (movies) {

                    const data = { movies, cinema, showData };
                    return res.status(200).send(data);
                })

            })

        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("error");
    }

})


app.get('/api/getCinemaHomeMovies', async (req, res) => {

    const p = Showtime.find({
        date: {
            $gte: moment().startOf("Day").toDate(),
            $lte: moment().add(6, "days").toDate()
        }
    }).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        var upcommingShows = [];
        var todayShows = [];
        var shows = [];

        docs.map(function (s) {
            if (moment(s.date).startOf("day").diff(moment().startOf("day")) > 0)
                upcommingShows.push(s.movieId);
            else
                todayShows.push(s.movieId);
            shows.push(s.movieId);
        });


        const commingSoonIds = upcommingShows.filter((item, index) => upcommingShows.indexOf(item) === index);
        const nowShowingIds = todayShows.filter((item, index) => todayShows.indexOf(item) === index);

        Movie.find({ _id: { $in: shows } }).select('_id poster_url title runtime  videoLinks background_url description rating title genreList certification').exec((err, movies) => {
            if (err) return res.status(400).send(err);

            var commingSoonMovies = [];
            var nowShowingMovies = [];

            movies.map((movie) => {
                commingSoonIds.map((item) => {
                    if (item == movie._id)
                        commingSoonMovies.push(movie);
                })
                nowShowingIds.map((item) => {
                    if (item == movie._id)
                        nowShowingMovies.push(movie);
                })
            })

            return res.status(200).json({ commingSoon: commingSoonMovies, nowShowing: nowShowingMovies })
        });
    });
});

app.get('/api/getFavoriteMovies', auth, (req, res) => {
    Movie.find({ _id: { $in: req.user.favorites } }).sort({ createdAt: -1 }).select('_id poster_url title runtime  description rating title releaseDate ').exec((err, doc) => {
        if (err) return res.status(400).send(err);

        return res.status(200).json({ "movies": doc })
    })
})


app.get('/api/getHomeMovies', async (req, res) => {

    Movie.find({ releaseDate: { $gt: moment().toDate() } }).sort({ releaseDate: -1 }).select('_id poster_url title runtime  videoLinks background_url description rating title genreList certification').exec((err, doc) => {
        if (err) return res.status(400).send(err);

        const upcommingMovies = [...doc];
        Movie.find({ releaseDate: { $lte: moment().toDate() } }).sort({ releaseDate: -1 }).limit(96).select('_id poster_url title runtime  videoLinks background_url description rating title genreList certification').exec((err, doc) => {
            if (err) return res.status(400).send(err);
            // console.log(doc)
            return res.status(200).json({
                commingSoon: upcommingMovies,
                moviesList: doc
            })

        })
    })
})


app.get('/api/getMovieInfo', async function (req, res) {

    let id = req.query.id;

    Movie.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        const today = moment().startOf('day');

        //$gte greater than equal to $lte less than equal to
        var promise = Showtime.find({
            movieId: id,
            date: {
                $gte: today.toDate(),
                $lte: moment(today).add(6, "days").toDate()
            }
        }).exec();

        promise.then(function (showtimes) {
            var cinemaIds = showtimes.map(function (s) {
                return s.cinemaId;
            });

            const p = Cinema.find({ "_id": { "$in": cinemaIds } }).select('_id name city address url').exec()
            return p.then(function (cinemas) {
                const data = { cinemas, showtimes };
                return data;
            })
        }).then(function (data) {
            // do something with the cinemas here

            Review.find({ movieId: doc._id }).sort({ createdAt: 'DESC' }).exec((err, reviews) => {
                if (err) return res.status(400).send(err);

                return res.status(200).json({
                    showtime: data.showtimes,
                    cinema: data.cinemas,
                    movie: doc,
                    reviews: reviews
                });
            })

        }).then(null, function (err) {
            // handle error here
            if (err) console.log(err);
            return res.status(200).json({
                showtime: null,
                cinema: null,
                movie: doc
            });
        });
    });

});

app.get('/api/getCinemaMovieShowtimes', auth2, (req, res) => {
    Showtime.find({ cinemaId: req.query.cinemaId, movieId: req.query.movieId }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            showtime: doc,
        })
    })
})

app.get('/api/getMovieTMDB', auth2, (req, res) => {

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


app.get('/api/getRecommendations', auth, async (req, res) => {
    var dataToSend, err;
    // spawn new child process to call the python script
    //variables file name, movie name, api key
    Movie.find({ _id: { $in: req.user.favorites } }).select('title').exec((err, movies) => {
        if (err) return res.status(400).send(err);

        if (movies) {

            const titles = movies.map((m) => (m.title));
            const python = spawn('python', ['./server/recommendation/recommend.py', JSON.stringify(titles)]);

            // collect data from script
            python.stdout.on('data', function (data) {

                dataToSend = data.toString();
            });

            python.on('close', (code) => {
                try {
                    const r = JSON.parse(dataToSend);
                    const recommendations = r.movies;

                    Movie.find({ title: { $in: recommendations } }).sort({ releaseDate: -1 }).limit(12).select('_id poster_url title runtime  videoLinks background_url description rating title genreList certification').exec((err, movies) => {
                        if (err) return res.status(400).send(err);
                        return res.status(200).send(movies);
                    })
                }
                catch (err) {
                    console.log(err);
                    return res.status(404).json({ message: "Error getting recommendations." });
                }
            });

        }
        else {
            return res.status(200).json({ "movies": [] })
        }

    })

});

app.get('/api/getCertification', (req, res) => {
    Movie.find().exec((err, movies) => {
        var certification = [];
        movies.map((item, key) => {
            certification.push(item.certification);
        })

        const withoutDups = certification.filter((item, index) => certification.indexOf(item) === index)
        return res.status(200).send(withoutDups);
    });
})

app.get('/api/getCinepaxData', (req, res) => {
    var dataToSend, err;

    // const data = [{ "city": "Islamabad", "showDate": "2021-07-25 00:00:00", "showDay": "SUN", "scrapeDate": "2021-07-25 21:46:05.444708", "movie": { "showtimes": [{ "address": "CINEPAX WORLD TRADE CENTER - Islamabad", "screen": ["SCREEN 1- SILVER", "10:00PM"] }], "title": "Black Widow" } }, { "city": "Islamabad", "showDate": "2021-07-26 00:00:00", "showDay": "MON", "scrapeDate": "2021-07-25 21:46:07.090926", "movie": { "showtimes": [{ "address": "CINEPAX WORLD TRADE CENTER - Islamabad", "screen": ["SCREEN 2 - PLATINUM", "3:00PM"] }], "title": "F9" } }, { "city": "Islamabad", "showDate": "2021-07-27 00:00:00", "showDay": "TUE", "scrapeDate": "2021-07-25 21:46:08.723825", "movie": { "showtimes": [{ "address": "CINEPAX WORLD TRADE CENTER - Islamabad", "screen": ["SCREEN 2 - PLATINUM", "3:00PM"] }], "title": "F9" } }, { "city": "Lahore", "showDate": "2021-07-26 00:00:00", "showDay": "MON", "scrapeDate": "2021-07-25 21:46:15.856384", "movie": { "showtimes": [{ "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Screen 5", "1:30PM"] }, { "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Platinum 2", "2:00PM", "5:00PM", "8:00PM"] }, { "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Platinum 1", "2:45PM", "5:40PM", "8:30PM"] }, { "address": "CINEPAX AMANAH MALL - Lahore", "screen": ["SILVER 2", "3:00PM", "8:40PM"] }, { "address": "CINEPAX AMANAH MALL - Lahore", "screen": ["Gold Screen", "3:30PM", "6:30PM", "9:30PM"] }], "title": "Black Widow" } }, { "city": "Lahore", "showDate": "2021-07-27 00:00:00", "showDay": "TUE", "scrapeDate": "2021-07-25 21:46:17.499282", "movie": { "showtimes": [{ "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Screen 5", "1:30PM"] }, { "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Platinum 2", "2:00PM", "5:00PM", "8:00PM"] }, { "address": "CINEPAX PACKAGES MALL - Lahore", "screen": ["Platinum 1", "2:45PM", "5:40PM", "8:30PM"] }, { "address": "CINEPAX AMANAH MALL - Lahore", "screen": ["SILVER 2", "5:45PM"] }, { "address": "CINEPAX AMANAH MALL - Lahore", "screen": ["Gold Screen", "3:35PM", "6:35PM", "9:35PM"] }], "title": "Black Widow" } }]

    const python2 = spawn('python', ['./server/crawler/cinepax.py']);

    // collect data from script
    python2.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...',);
        dataToSend = data.toString();
    });


    python2.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        try {
            // var data = JSON.parse(dataToSend);
            // console.log(data);
            data.forEach(element => {

                let showtimes = new Array();
                if (element.movie) {
                    element.movie.showtimes.forEach(show => {
                        showtimes.push(show);

                        Cinema.findOne({ name: "Cinepax", address: show.address, city: element.city }).select('_id').exec((err, cinema) => {
                            if (err) return res.status(400).send(err);

                            if (cinema != null) {

                                Movie.findOne({ title: { $regex: '.*' + element.movie.title + '.*' } }, (err, movie) => {
                                    if (err) return res.status(400).send(err);
                                    if (movie == null) {
                                        console.log("Movie not found");
                                    }

                                    let time = new Array();
                                    for (i = 1; i < show.screen.length; i++) {
                                        time.push(show.screen[i]);
                                    }

                                    const showData = {
                                        movieId: movie._id,
                                        cinemaId: cinema._id,
                                        date: new Date(element.showDate),
                                        movieTitle: movie.title,
                                        runtime: movie.runtime,
                                        language: 'English',
                                        showType: 'cinema',
                                        screenType: show.screen[0],
                                        time: time
                                    }
                                    const showtime = new Showtime(showData);

                                    showtime.save((error, showtime) => {
                                        if (error) {
                                            console.log(error)
                                            return res.status(400).send(error);
                                        }
                                    })
                                })
                            }

                        })
                    });
                }
            });


        }
        catch (e) {
            console.log(e);
            return res.status(404).json({ message: "Error getting data info cinepax.", found: false });
        }
    });


    // res.status(200).send({ "message": data });



});

app.get('/api/getMovieByName', auth2, (req, res) => {
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
app.post('/api/create-cinema', auth2, (req, res) => {

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

app.post('/api/create-review', auth, (req, res) => {

    const review = new Review(req.body);
    review.save((error, review) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error);
        }
        res.status(200).json({
            post: true,
            reviewId: review._id
        })
    });
})

app.post('/api/report-review', auth, (req, res) => {

    let report = req.body;
    report = {
        ...report,
        userId: req.user._id
    }

    ReviewReport.findOne({ userId: req.user._id, reviewId: report.reviewId }, (err, doc) => {
        if (err) return res.status(400).send({ message: 'There is an error reporting review.', post: false });

        if (doc === null) {
            const reviewReport = new ReviewReport(report);
            reviewReport.save((error, report) => {
                if (error) {
                    console.log(error)
                    return res.status(400).send(error);
                }
                res.status(200).json({
                    message: 'Review has been reported successfully.',
                    post: true,
                    reportId: report._id
                })
            });
        }
        else {
            res.status(200).json({
                message: 'Review already reported.',
                post: false,
                reviewId: doc.reviewId
            })
        }

    })

})
app.post('/api/voteReview', auth, (req, res) => {

    Review.findById(req.body.reviewId).lean().exec((err, review) => {
        if (err) return res.status(400).json(err);

        const reviewFound = review.votes.find(({ userId }) => userId == req.user._id);
        if (reviewFound == null) {
            if (req.body.voteType === 1 || req.body.voteType === -1)
                review.votes.push({ userId: req.user._id, vote: req.body.voteType });
        }
        else {
            const index = review.votes.indexOf(reviewFound);
            if (req.body.voteType == reviewFound.vote) {
                if (index > -1)
                    review.votes.splice(index, 1);
            }
            else {
                review.votes[index].vote = req.body.voteType;
            }
        }

        Review.findByIdAndUpdate(review._id, review, { new: true }, (err, doc) => {
            if (!err) return res.status(200).json(doc);
            else {
                console.log("Error: could not save vote", err);
                return res.status(400).send(err);
            }
        })
    })
})

app.post('/api/addMovieInCinema', auth2, async (req, res) => {

    let movieData = req.body;
    Cinema.findById(movieData.cinemaID, (err, docs) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err);
        }

        Cinema.findByIdAndUpdate(movieData.cinemaID, { $addToSet: { moviesList: movieData.movie._id } },
            function (err, docs) {
                if (err) {
                    console.log(err)
                    return res.status(400).json(err);
                }

                for (var i = 0; i < docs.moviesList.length; i++) {
                    if (docs.moviesList[i] === movieData.movie._id) {
                        return res.status(200).json({
                            post: true,
                            cinemaId: docs._id
                        })
                    }
                }


                if (movieData.tmdb === true) {
                    movieData.movie.releaseDate = moment(movieData.movie.releaseDate).toDate();
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
            });
    });
})




app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false })
        };
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Invalid Email or Password' })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Invalid Email or Password'
            });
            else if (user.status == "suspended") {
                return res.json({
                    isAuth: false,
                    message: 'Account is Suspended!'
                });
            }
            else {
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie('auth', user.token).json({
                        isAuth: true,
                        id: user._id,
                        email: user.email
                    })
                })
            }
        })
    })
})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

app.get('/api/getCinemas', (req, res) => {
    Cinema.find({}).select("_id name city address").exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            cinemasList: docs
        })
    })
})

app.get('/api/user-info', auth, (req, res) => {
    User.findById(req.query.id).select("name city dob").exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            user: doc,
        })
    })
})

app.get('/api/cinema-info', auth, (req, res) => {
    // console.log(req.query.id)
    Cinema.findById(req.query.id).select("name address city url").exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            cinema: doc,
        })
    })
})

app.get('/api/user-settings', auth, (req, res) => {
    User.findById(req.query.id).select("showProfaneWords emailNotification").exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            user: doc,
        })
    })
})



//UPDATE
app.post('/api/user-update', auth, (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send({ success: false });
        res.json({
            message: "Updated successfully"
        })
    })
})

app.post('/api/cinema-update', auth, (req, res) => {
    Cinema.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send({ success: false });
        res.json({
            message: "Updated successfully"
        })
    })
})

app.post('/api/change_password', auth, (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ message: 'Email not found' })
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                message: 'Current Password is wrong'
            });
            bcrypt.genSalt(10, function (error, salt) {
                bcrypt.hash(req.body.newPassword, salt, function (error, hash) {
                    if (error) return next(error);
                    User.findOneAndUpdate({ email: user.email }, {
                        password: hash
                    }, null, function (err, docs) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.status(200).send({ message: 'Password updated' });
                        }
                    });
                })
            })
        })
    })
})

app.post('/api/addToFavorites', auth, (req, res) => {
    const movieId = req.body.movieId;
    const found = req.user.favorites.find((item) => (item === movieId))
    if (found) {
        User.findByIdAndUpdate(req.user._id, { $pull: { favorites: movieId } }, (err, doc) => {
            if (err) return res.status(400).send(err);
            res.json({
                success: false,
            })
        })
    }
    else {
        User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: movieId } }, (err, doc) => {
            if (err) return res.status(400).send(err);
            res.json({
                success: true,
            })
        })

    }
})


app.post('/api/sendPromotionalEmail', auth2, (req, res) => {


    try {
        User.find({}).select('email name emailNotification').exec((err, users) => {
            if (err) {
                console.log("Error", err)
                return res.status(400).send("Users not found");
            }

            users.map((user, key) => {
                if (user.emailNotification == true) {
                    Movie.find({ rating: { $gte: '7' } }).sort({ rating: "desc" }).limit(3).exec((err, doc) => {
                        if (err)
                            return res.status(500).json("error ");

                        const movie = doc.map((item, key) => {
                            return item;
                        })

                        const showtimes = Showtime.find().limit(3).lean().exec();

                        showtimes.then((showtime) => {

                            const shows = showtime.map((item, key) => {
                                return item;
                            })

                            var readHTMLFile = function (path, callback) {
                                fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                                    if (err) {
                                        throw err;
                                        callback(err);
                                    }
                                    else {
                                        callback(null, html);
                                    }
                                });
                            };


                            readHTMLFile('./server/emails/email-templates/top-picks.html', function (err, html) {
                                // console.log("HTML", movie);
                                var template = handlebars.compile(html);

                                const getFirstName = (str) => {
                                    if (str.substr(0, str.indexOf(' ')) === "")
                                        return str
                                    return str.substr(0, str.indexOf(' '))
                                }

                                var userName = getFirstName(user.name);

                                var replacements = {
                                    username: userName,
                                    top_movie_poster_url: movie[0].poster_url,
                                    top_movie_description: movie[0].description,
                                    top_movie_title: movie[0].title,
                                    top_rated_movie_1_title: movie[1].title,
                                    top_rated_movie_1_poster_url: movie[1].poster_url,
                                    top_rated_movie_1_description: movie[1].description,
                                    top_rated_movie_1_runtime: movie[1].runtime,
                                    top_rated_movie_1_rating: movie[1].rating,
                                    top_rated_movie_2_title: movie[2].title,
                                    top_rated_movie_2_poster_url: movie[2].poster_url,
                                    top_rated_movie_2_description: movie[2].description,
                                    top_rated_movie_2_runtime: movie[2].runtime,
                                    top_rated_movie_2_rating: movie[2].rating,
                                    showtime_1_title: shows[0].movieTitle,
                                    showtime_1_time: moment(shows[0].date).format("hh:mm A"),
                                    showtime_2_title: shows[1].movieTitle,
                                    showtime_2_time: moment(shows[1].date).format("hh:mm A"),
                                    showtime_3_title: shows[2].movieTitle,
                                    showtime_3_time: moment(shows[2].date).format("hh:mm A")

                                };

                                var htmlToSend = template(replacements);
                                var mailOptions = {
                                    from: config.MOVIEHUT_EMAIL_AUTH_USER,
                                    to: [user.email],
                                    subject: 'Movie Hut: Top Picks for you!',
                                    preview: true,
                                    html: htmlToSend
                                };

                                return transporter.sendMail(mailOptions, function (error, response) {
                                    if (error) {
                                        // console.log(error);
                                        callback(error);
                                    }

                                    return res.status(200).json({ post: true, message: "Email sent successfully" })
                                });
                            });

                        })

                    });
                }


            })
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Error sending email");
    }

    // User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    //     if (err) return res.status(400).send(err);
    //     res.json({
    //         success: true,
    //         doc
    //     })
    // })
})

app.get('/api/users', auth2, (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    User.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.post('/api/resolve_report', auth2, (req, res) => {
    let id = req.query.id;

    ReviewReport.findOneAndUpdate({ _id: id }, { status: "resolved" }, null, function (err, doc) {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.post('/api/user-suspend', auth2, (req, res) => {
    let id = req.query.id;
    // console.log(id)
    User.findOneAndUpdate({ _id: id }, { status: "suspended" }, null, function (err, doc) {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.post('/api/user-unsuspend', auth2, (req, res) => {
    let id = req.query.id;
    // console.log(id)
    User.findOneAndUpdate({ _id: id }, { status: "active" }, null, function (err, doc) {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.delete('/api/delete_review', (req, res) => {
    let id = req.query.id;
    console.log(id)
    Review.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            ReviewReport.updateMany({ reviewId: id }, { status: "resolved and deleted" }, null, function (err, doc) {
                if (err) return res.status(400).send(err);
                res.json(true)
            })
        }
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
