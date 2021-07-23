from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk
import numpy as np
import pandas as pd
import pymongo
import sys
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["Movie_Hut"]
mycol = mydb["movies"]

# construct pandas dataframe from pymongo collection
df = pd.DataFrame(list(mycol.find()))

# take input
titleList = []

titleArguments = json.loads(sys.argv[1])
for title in titleArguments:
    titleList.append(title)

inputList = []

# check if input movie exists in DB
for title in titleList:
    if not (df['title'] == title).any():
        print(json.dumps({"movies": []}))
    else:
        inputList.append(title)


if not inputList:
    print(json.dumps({"movies": []}))
    sys.exit()

# Required columns - Title and movie plot
finaldata = df[["title", "description"]]
finaldata = finaldata.set_index('title')  # Setting the movie title as index

# uncomment downloads on very 1st run
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('wordnet')
# nltk.download('stopwords')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))
VERB_CODES = {'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'}


def preprocess_sentences(text):
    text = text.lower()
    temp_sent = []
    words = nltk.word_tokenize(text)
    tags = nltk.pos_tag(words)
    for i, word in enumerate(words):
        if tags[i][1] in VERB_CODES:
            lemmatized = lemmatizer.lemmatize(word, 'v')
        else:
            lemmatized = lemmatizer.lemmatize(word)
        if lemmatized not in stop_words and lemmatized.isalpha():
            temp_sent.append(lemmatized)

    finalsent = ' '.join(temp_sent)
    finalsent = finalsent.replace("n't", " not")
    finalsent = finalsent.replace("'m", " am")
    finalsent = finalsent.replace("'s", " is")
    finalsent = finalsent.replace("'re", " are")
    finalsent = finalsent.replace("'ll", " will")
    finalsent = finalsent.replace("'ve", " have")
    finalsent = finalsent.replace("'d", " would")
    return finalsent


finaldata["plot_processed"] = finaldata["description"].apply(
    preprocess_sentences)
finaldata.head()

# Vectorizing pre-processed movie plots using TF-IDF
tfidfvec = TfidfVectorizer()
tfidf_movieid = tfidfvec.fit_transform((finaldata["plot_processed"]))

# Finding cosine similarity between vectors
cos_sim = cosine_similarity(tfidf_movieid, tfidf_movieid)

# Storing indices of the data
indices = pd.Series(finaldata.index)


def recommendations(title, cosine_sim=cos_sim):
    recommended_movies = []
    index = indices[indices == title].index[0]
    similarity_scores = pd.Series(
        cosine_sim[index]).sort_values(ascending=False)
    top_10_movies = list(similarity_scores.iloc[1:4].index)
    for i in top_10_movies:
        recommended_movies.append(list(finaldata.index)[i])
    return recommended_movies


output = []
for input_movie in inputList:
    temp = recommendations(input_movie)
    for t in temp:
        if t not in output:  # avoid duplicate recommendations
            output.append(t)

for input_movie in inputList:
    if input_movie in output:
        output.remove(input_movie)  # remove input movies from recommendations

toJson = json.dumps({"movies": output})
print(toJson)
