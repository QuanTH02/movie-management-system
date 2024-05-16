import mysql.connector
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

str_select_all_movieinformation = "SELECT * FROM `filmdata`.`movieinformation`;" 
mycursor.execute(str_select_all_movieinformation)
select_all_movieinformation = mycursor.fetchall() 

all_movie_data = []

if select_all_movieinformation:
    index = 1
    for movieinformation in select_all_movieinformation:
        # movie_id
        # print("Movie ID: " + str(movieinformation[0]))

        # movie_name
        # print("Movie name: " + movieinformation[1])

        # describe
        # print("Describe: " + movieinformation[8])

        # genres
        genres_list = []
        str_select_genres_id_movie_genres = "SELECT * FROM `filmdata`.`movie_genres` WHERE `movie_id` = " + str(movieinformation[0]) + ";"
        mycursor.execute(str_select_genres_id_movie_genres)
        select_genres_id_movie_genres = mycursor.fetchall()

        if select_genres_id_movie_genres:
            for movie_genres in select_genres_id_movie_genres:
                str_select_all_genres_genres = "SELECT * FROM `filmdata`.`genres` WHERE `genres_id` = " + str(movie_genres[1]) + ";"
                mycursor.execute(str_select_all_genres_genres)
                select_all_genres_genres = mycursor.fetchall()

                if select_all_genres_genres:
                    for genres in select_all_genres_genres:
                        if genres[1] == "":
                            continue
                        # print("Genres: " + genres[1])
                        genres_list.append(genres[1])

        # director
        director_list = []
        str_select_director_id_movie_director = "SELECT * FROM `filmdata`.`movie_director` WHERE `movie_id` = " + str(movieinformation[0]) + ";"
        mycursor.execute(str_select_director_id_movie_director)
        select_director_id_movie_director = mycursor.fetchall()

        if select_director_id_movie_director:
            for movie_director in select_director_id_movie_director:
                str_select_all_director_director = "SELECT * FROM `filmdata`.`director` WHERE `director_id` = " + str(movie_director[1]) + ";"
                mycursor.execute(str_select_all_director_director)
                select_all_director_director = mycursor.fetchall()

                if select_all_director_director:
                    for director in select_all_director_director:
                        if director[1] == "":
                            continue
                        # print("Director: " + director[1])
                        director_list.append(director[1])
                
        # cast
        cast_list = []
        str_select_cast_id_movie_cast = "SELECT * FROM `filmdata`.`movie_cast` WHERE `movie_id` = " + str(movieinformation[0]) + ";"
        mycursor.execute(str_select_cast_id_movie_cast)
        select_cast_id_movie_cast = mycursor.fetchall()

        if select_cast_id_movie_cast:
            for movie_cast in select_cast_id_movie_cast:
                str_select_all_cast_cast = "SELECT * FROM `filmdata`.`cast` WHERE `cast_id` = " + str(movie_cast[1]) + ";"
                mycursor.execute(str_select_all_cast_cast)
                select_all_cast_cast = mycursor.fetchall()

                if select_all_cast_cast:
                    for cast in select_all_cast_cast:
                        if cast[1] == "":
                            continue
                        # print("Cast: " + cast[1])
                        cast_list.append(cast[1])
        movie_data = {
            "movie_id": movieinformation[0],
            "movie_name": movieinformation[1],
            "describe": movieinformation[8],
            "genres": genres_list,
            "director": director_list,
            "cast": cast_list
        }

        # print(movie_data)
        all_movie_data.append(movie_data)
        # print("--------------------------------------------------------------------------------------------------------------------------------")
        # if index == 1:
        #     break
        
        index += 1

movie_df = pd.DataFrame(all_movie_data)
# print(movie_df)
movie_df['genres'] = movie_df['genres'].apply(lambda x: ' '.join(x))
movie_df['cast'] = movie_df['cast'].apply(lambda x: ' '.join(x))
movie_df['director'] = movie_df['director'].apply(lambda x: ' '.join(x))

movie_df.dropna(inplace=True)
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

tfidf_matrix = tfidf_vectorizer.fit_transform(movie_df['genres'] + ' ' + movie_df['describe'] + ' ' + movie_df['cast'] + ' ' + movie_df['director'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def recommend(movie_title, cosine_sim=cosine_sim):
    idx = movie_df[movie_df['movie_name'] == movie_title].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]  # Bỏ qua bộ phim đầu tiên vì nó sẽ là bộ phim gốc
    movie_indices = [i[0] for i in sim_scores]
    return movie_df['movie_name'].iloc[movie_indices]

recommendations = recommend('Inception')
print(recommendations)