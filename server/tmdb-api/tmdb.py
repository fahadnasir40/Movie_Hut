import requests
import json
import sys


from json import JSONEncoder


key = sys.argv[2]


class MovieEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


class Movie:
    def __init__(self, backImg, posterImg, genreList, description, runtime, releaseDate, rating, videoLinks, castList, title, certification, movieId):
        self.movieId = movieId
        self.title = title
        self.backImg = backImg  # link for image
        self.posterImg = posterImg  # link for image
        self.genreList = genreList
        self.description = description
        self.runtime = runtime
        self.releaseDate = releaseDate
        self.rating = rating
        self.videoLinks = videoLinks
        self.castList = castList
        self.certification = certification

    def printMovie(self):
        movie_data = {
            "movieId": self.movieId,
            "title": self.title,
            "background_url": self.backImg,
            "poster_url": self.posterImg,
            "description":  self.description,
            "genreList": self.genreList,
            "runtime": self.runtime,
            "releaseDate": self.releaseDate,
            "rating": self.rating,
            "videoLinks": self.videoLinks,
            "cast": self.castList,
            "certification": self.certification
        }
        movie_json = json.dumps(movie_data, indent=4, cls=MovieEncoder)
        print(movie_json)
        # print('Background url = ', self.backImg)
        # print('Poster url = ', self.posterImg)
        # print('Genre list :')
        # print(self.genreList)
        # print('Description = ', self.description)
        # print('Runtime = ', self.runtime)
        # print('Release date = ', self.releaseDate)
        # print('Rating = ', self.rating)
        # print('Video links:')
        # print(self.videoLinks)


class Cast:
    def __init__(self, name, character):
        self.name = name
        self.character = character

    def printCast(self):
        cast = {
            "name": self.name,
            "character": self.character
        }
        cast_json = json.dumps(cast, indent=4, cls=MovieEncoder)
        print(cast_json)
        # print(self.name, ' as ', self.character)


def getMovieID(movieName):
    request = 'https://api.themoviedb.org/3/search/movie?query={0}&api_key={1}&page=1&include_adult=true'.format(movieName,
                                                                                                                  key)
    response = requests.get(request)
    if response.status_code != 200:
        print('Error 404. Not Found')
        sys.exit()
    data = response.json()
    x = data.get("results")
    for y in x:
        z = y.get("id")
        title = y.get("title")
        if title == movieName:
            return z


def getMovieCredits(movieID, castList):
    request = 'https://api.themoviedb.org/3/movie/{0}/credits?api_key={1}'.format(
        movieID, key)
    response = requests.get(request)
    if response.status_code != 200:
        print('Error 404. Not Found')
        sys.exit()
    data = response.json()
    x = data.get('cast')
    for y in x:
        name = y.get("name")
        character = y.get("character")
        cast = Cast(name, character)
        castList.append(cast)


def getCertifications(movieID):
    request = 'https://api.themoviedb.org/3/movie/{0}/release_dates?api_key={1}'.format(movieID,
                                                                                        key)
    response = requests.get(request)
    if response.status_code != 200:
        print('Request failed! Exitting')
        sys.exit()
    data = response.json()
    results = data.get('results')
    certificate = ''
    for r in results:
        if r.get('iso_3166_1') == 'US':
            release = r.get('release_dates')
            for rel in release:
                certificate = rel.get('certification')
                return certificate


def getMovieDetails(movieID, castList, title):
    request = 'https://api.themoviedb.org/3/movie/{0}?api_key={1}'.format(
        movieID, key)
    response = requests.get(request)

    if response.status_code != 200:
        print('Error 404. Not Found')
        sys.exit()
    data = response.json()
    backImgPath = data.get('backdrop_path')
    # w500 is image size, change int 500 to any specific
    backImg = ''
    posterImg = ''

    if backImgPath:
        backImg = 'https://image.tmdb.org/t/p/w1280' + backImgPath
    posterImgPath = data.get('poster_path')

    if posterImgPath:
        posterImg = 'https://image.tmdb.org/t/p/w500' + posterImgPath

    genreList = []

    for genre in data.get("genres"):
        genreList.append(genre.get("name"))
    description = data.get("overview")
    runTime = data.get("runtime")
    releaseDate = data.get("release_date")
    rating = data.get("vote_average")
    certificate = getCertifications(movieID)
    request = 'https://api.themoviedb.org/3/movie/{0}/videos?api_key={1}'.format(
        movieID, key)
    response = requests.get(request)

    if response.status_code != 200:
        print('Error 404. Not Found')
        sys.exit()

    data = response.json()
    x = data.get("results")
    videoLinks = []
    youtube = 'https://www.youtube.com/watch?v='
    vimeo = 'https://vimeo.com/'

    for link in x:
        if link.get("site") == 'YouTube':
            completeLink = youtube + link.get("key")
            videoLinks.append(completeLink)
        elif link.get("site") == 'Vimeo':
            completeLink = vimeo + link.get("key")
            videoLinks.append(completeLink)

    movie = Movie(backImg, posterImg, genreList,
                  description, runTime, releaseDate, rating, videoLinks, castList, title, certificate, movieId)
    return movie


title = sys.argv[1]
movieId = getMovieID(title)
castList = []
getMovieCredits(movieId, castList)

movie = getMovieDetails(movieId, castList, title)
movie.printMovie()
