import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["MDB"]
mycol = mydb["Movie"]

starredGenre = ['Animation']
starredCast = ['Scarlett Johansson']

print('recommended movies:')

for x in mycol.find():
    for genre in starredGenre:
        if genre == x['genre']:  # check genre column in table
            print(x['title'], '-> similar genre')
    for cast in starredCast:
        if cast in x['cast']:  # check the cast list in cast column in table
            print(x['title'], '-> similar cast')
