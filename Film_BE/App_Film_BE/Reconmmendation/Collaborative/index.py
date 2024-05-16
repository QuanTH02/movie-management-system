import mysql.connector
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

str_select_all_movieinformation = "SELECT * FROM `filmdata`.`movieinformation`;" 
mycursor.execute(str_select_all_movieinformation)
select_all_movieinformation = mycursor.fetchall() 

str_select_all_user_name_fake = "SELECT * FROM `filmdata`.`user_name_fake`;" 
mycursor.execute(str_select_all_user_name_fake)
select_all_user_name = mycursor.fetchall()

def rating_clean(rating):
    if "/" in rating:
        return int(rating.split("/")[0])
    return rating

data = {
    "user_name": [],
    "movie_id": [],
    "rating": []
}

if select_all_user_name:
    for user_name in select_all_user_name:
        # user_name
        # print("User name: " + user_name[0])

        if select_all_movieinformation:
            for movieinformation in select_all_movieinformation:        
                # print("Movie id: " + str(movieinformation[0]))      
                data["user_name"].append(user_name[0])
                data["movie_id"].append(movieinformation[0])

                rating = False

                # rating in film_review
                str_select_film_review_movie_id = "SELECT * FROM `filmdata`.`film_review` WHERE `name_review` = '" + str(user_name[0]) + "' AND `movie_id` = '" + str(movieinformation[0]) + "' AND `star_review` != '10/10';"
                mycursor.execute(str_select_film_review_movie_id)
                select_film_review_movie_id = mycursor.fetchall()

                if select_film_review_movie_id:
                    for film_review in select_film_review_movie_id:
                        rating = True
                        data["rating"].append(rating_clean(film_review[2]))
                        # print("Rating: " + rating_clean(film_review[2]))

                # rating in like_movie
                str_select_like_movie_movie_id = "SELECT * FROM `filmdata`.`like_movie` WHERE `user_name` = '" + str(user_name[0]) + "' AND `movie_id` = '" + str(movieinformation[0]) + "';"
                mycursor.execute(str_select_like_movie_movie_id)
                select_like_movie_movie_id = mycursor.fetchall()

                if select_like_movie_movie_id:
                    for like_movie in select_like_movie_movie_id:
                        rating = True
                        data["rating"].append(10)

                if not rating:
                    data["rating"].append(0)
                    # print("Rating: 0")                        
        # print(data)
        print("--------------------------------------------------------------------------------------------------------------------------------")

        df = pd.DataFrame(data)
        # print(df.head())



