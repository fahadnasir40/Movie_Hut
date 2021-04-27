const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const moment = require("moment")
const { spawn } = require('child_process');
const async = require("async");
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");
const { auth2 } = require("./middleware/auth2");

const nodemailer = require('nodemailer');
const Email = require('email-templates');
const handlebars = require('handlebars');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('view engine', 'ejs');

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

app.post('/api/forgotPassword', (req, res) => {
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
        date =  new Date();
        date.setHours(date.getHours() + 1)
        User.findOneAndUpdate({ email: req.body.email }, 
            {resetPasswordToken: token, resetPasswordExpires: date}, null, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                //node mailer code
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: config.MOVIEHUT_EMAIL_AUTH_USER,
                        pass: config.MOVIEHUT_EMAIL_AUTH_SECRET
                    },
                });

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
    }});
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
        if(user.resetPasswordExpires < d){
            res.send('password reset link is invalid or has expired');
        }
        else{
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
        else if(user.resetPasswordExpires < d){
            res.status(403).send('password reset link is invalid or has expired');
        }
        else if (user != null) {
            bcrypt.genSalt(10, function (error, salt) {
                bcrypt.hash(req.body.password, salt, function (error, hash) {
                    if (error) return next(error);
                    User.findOneAndUpdate({ email: user.email }, 
                        {resetPasswordToken: null,
                            resetPasswordExpires: null,
                            password: hash}, null, function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            res.status(200).send({ message: 'password updated' });
                        }
                    });
                })
            }
        )}
    })
});
// GET //


app.get('/api/sendEmail', async (req, res) => {


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

            // var testMailTemplate = new emailTemplate(templateDir)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.MOVIEHUT_EMAIL_AUTH_USER,
                    pass: config.MOVIEHUT_EMAIL_AUTH_SECRET
                }
            });


            var readHTMLFile = function (path, callback) {
                fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                    if (err) {
                        // console.log(err);
                        throw err;
                        callback(err);
                    }
                    else {
                        callback(null, html);
                    }
                });
            };

            readHTMLFile('./server/email-templates/top-picks.html', function (err, html) {
                // console.log("HTML", movie);
                var template = handlebars.compile(html);
                var replacements = {
                    username: `Faizan`,
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
                    showtime_1_title: 'Joker',
                    showtime_1_time: moment(shows[0].date).format("hh:mm A"),
                    showtime_2_title: 'Djanhgo Unchained',
                    showtime_2_time: moment(shows[1].date).format("hh:mm A"),
                    showtime_3_title: 'Descpicable Me 3',
                    showtime_3_time: moment(shows[2].date).format("hh:mm A")

                };

                var htmlToSend = template(replacements);
                var mailOptions = {
                    from: config.MOVIEHUT_EMAIL_AUTH_USER,
                    to: ['faizanbutt833@gmail.com'],
                    subject: 'Movie Hut: Top Picks for you!',
                    preview: true,
                    html: htmlToSend
                };

                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        // console.log(error);
                        callback(error);
                    }

                    return res.status(200).json("Email sent successfully")
                });
            });

        })

    });




})


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

app.get("/api/auth", auth2, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        dob: req.user.dob,
        role: req.user.role
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
            return res.status(200).json({
                showtime: data.showtimes,
                cinema: data.cinemas,
                movie: doc
            });
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

app.post('/api/addMovieInCinema', async (req, res) => {

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
        if (err) return res.json({ success: false });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

//UPDATE
app.post('/api/update_user',(req,res)=>{
    User.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
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
