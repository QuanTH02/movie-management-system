import mysql.connector
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random


conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

str_select_all_movieinformation = "SELECT * FROM `filmdata`.`movieinformation`;" 
mycursor.execute(str_select_all_movieinformation)
select_all_movieinformation = mycursor.fetchall() 
total_movie = len(select_all_movieinformation)
print("Total movie: " + str(total_movie))

def random_total_view_follow_film_user():
    return random.randint(1, 20)

def random_follow_film_user():
    i = random.randint(1, 30)
    arr_movie_id = []
    while i > 0:
        movie_id = random.randint(2, total_movie + 1)
        if movie_id not in arr_movie_id:
            arr_movie_id.append(movie_id)
            i -= 1

    return arr_movie_id

def random_like_movie():
    i = random.randint(1, 15)
    arr_movie_id = []
    while i > 0:
        movie_id = random.randint(2, total_movie + 1)
        if movie_id not in arr_movie_id:
            arr_movie_id.append(movie_id)
            i -= 1

    return arr_movie_id


def check_user_name(user_name):
    if "January" in user_name or "February" in user_name or "March" in user_name or "April" in user_name or "May" in user_name or "June" in user_name or "July" in user_name or "August" in user_name or "September" in user_name or "October" in user_name or "November" in user_name or "December" in user_name:
        return False
    return True

mycursor.execute("DELETE FROM `filmdata`.`like_movie`;")
conn.commit()

mycursor.execute("DELETE FROM `filmdata`.`follow_film_user`;")
conn.commit()
    
# # insert user_name_fake ------------------------
# str_select_all_distinct_film_review = "SELECT DISTINCT(name_review) FROM `filmdata`.`film_review`;"
# mycursor.execute(str_select_all_distinct_film_review)
# select_all_distinct_film_review = mycursor.fetchall()

# for name in select_all_distinct_film_review:
#     if check_user_name(name[0]):
#         str_insert_user_name_fake = "INSERT INTO `filmdata`.`user_name_fake` (`user_name`) VALUES (%s);"
#         val = (name[0],)
#         mycursor.execute(str_insert_user_name_fake, val)
#         conn.commit()
# # -----------------------------------------------

str_select_all_user_name_fake = "SELECT * FROM `filmdata`.`user_name_fake`;" 
mycursor.execute(str_select_all_user_name_fake)
select_all_user_name_fake = mycursor.fetchall()

follow_id = 1
if select_all_user_name_fake:
    for film_review in select_all_user_name_fake:
        # print("Film review ID: " + str(film_review[0]))

        if check_user_name(film_review[0]):
            # print("User name: " + film_review[4])
            arr_movie_id = random_like_movie()
            # print(arr_movie_id)

            # film_review
            str_select_film_review_movie_id = "SELECT * FROM `filmdata`.`film_review` WHERE `name_review` = '" + str(film_review[0]) + "';"
            mycursor.execute(str_select_film_review_movie_id)
            select_film_review_movie_id = mycursor.fetchall()

            # print("Num movie_id of film_review: " + str(len(select_film_review_movie_id)))
            
            for film_review_movie_id in select_film_review_movie_id:
                if film_review_movie_id[1] not in arr_movie_id and film_review_movie_id[2] == "10/10":
                    # print(film_review_movie_id[1])       
                    arr_movie_id.append(film_review_movie_id[1])

            # print(arr_movie_id)

            # like_movie
            for movie_id in arr_movie_id:
                str_insert_like_movie = "INSERT INTO `filmdata`.`like_movie` (`user_name`, `movie_id`) VALUES (%s, %s);"
                val = (film_review[0], str(movie_id))
                mycursor.execute(str_insert_like_movie, val)
                conn.commit()

            # # follow_film_user ----------------------------------------------------------
            # arr_movie_id_follow_film_user = random_follow_film_user()
            # # print(arr_movie_id_follow_film_user)

            # list_movie_insert_follow_film_user = list(set(arr_movie_id + arr_movie_id_follow_film_user))
            # # print(list_movie_insert_follow_film_user)

            # movie_id_insert = 2
            # for i in range(2, total_movie + 1):
            #     str_insert_follow_film_user = "INSERT INTO `filmdata`.`follow_film_user` (`follow_id`, `total_view`, `movie_id`, `user_name`) VALUES (%s, %s, %s, %s);"
            #     val = (follow_id, 0, i, film_review[4])
            #     mycursor.execute(str_insert_follow_film_user, val)
            #     conn.commit()
            #     follow_id += 1

            # for movie_id in list_movie_insert_follow_film_user:
            #     str_insert_follow_film_user = "UPDATE `filmdata`.`follow_film_user` SET `total_view` = %s WHERE `movie_id` = %s AND `user_name` = %s;"
            #     val = (random_total_view_follow_film_user(), movie_id, film_review[4])
            #     mycursor.execute(str_insert_follow_film_user, val)
            #     conn.commit()
            # # -----------------------------------------------------------------------------

        # break