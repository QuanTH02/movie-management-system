import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

# Delete ----------------------------------------------------------------

# user_name_fake
mycursor.execute("DELETE FROM `moviedata`.`user_name_fake`;")
conn.commit()

# like_movie
mycursor.execute("DELETE FROM `moviedata`.`like_movie`;")
conn.commit()

# link_img
mycursor.execute("DELETE FROM `moviedata`.`link_img`;")
conn.commit()

# link_trailler
mycursor.execute("DELETE FROM `moviedata`.`link_trailler`;")
conn.commit()

# movie_img
mycursor.execute("DELETE FROM `moviedata`.`movie_img`;")
conn.commit()

# movie_trailler
mycursor.execute("DELETE FROM `moviedata`.`movie_trailler`;")
conn.commit()

# follow_film_user
mycursor.execute("DELETE FROM `moviedata`.`follow_film_user`;")
conn.commit()

# movie_specialeffects
mycursor.execute("DELETE FROM `moviedata`.`movie_specialeffects`;")
conn.commit()

# specialeffects
mycursor.execute("DELETE FROM `moviedata`.`specialeffects`;")
conn.commit()

# movie_produced
mycursor.execute("DELETE FROM `moviedata`.`movie_produced`;")
conn.commit()

# produced
mycursor.execute("DELETE FROM `moviedata`.`produced`;")
conn.commit()

# movie_director
mycursor.execute("DELETE FROM `moviedata`.`movie_director`;")
conn.commit()

# director
mycursor.execute("DELETE FROM `moviedata`.`director`;")
conn.commit()

# movie_editing
mycursor.execute("DELETE FROM `moviedata`.`movie_editing`;")
conn.commit()

# editing
mycursor.execute("DELETE FROM `moviedata`.`editing`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `moviedata`.`movie_cinematography`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `moviedata`.`cinematography`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `moviedata`.`movie_music`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `moviedata`.`music`;")
conn.commit()

# movie_cast
mycursor.execute("DELETE FROM `moviedata`.`movie_cast`;")
conn.commit()

# cast
mycursor.execute("DELETE FROM `moviedata`.`cast`;")
conn.commit()

# movie_writers
mycursor.execute("DELETE FROM `moviedata`.`movie_writers`;")
conn.commit()

# writers
mycursor.execute("DELETE FROM `moviedata`.`writers`;")
conn.commit()

# # movie_content
# mycursor.execute("DELETE FROM `moviedata`.`movie_content`;")
# conn.commit()

# # content
# mycursor.execute("DELETE FROM `moviedata`.`content` WHERE content_id < 100000;")
# conn.commit()

# movie_genres
mycursor.execute("DELETE FROM `moviedata`.`movie_genres`;")
conn.commit()

# genres
mycursor.execute("DELETE FROM `moviedata`.`genres`;")
conn.commit()

# movie_taglines
mycursor.execute("DELETE FROM `moviedata`.`movie_taglines`;")
conn.commit()

# taglines
mycursor.execute("DELETE FROM `moviedata`.`taglines`;")
conn.commit()

# did_you_know
mycursor.execute("DELETE FROM `moviedata`.`did_you_know`;")
conn.commit()

# movie_specialeffects
mycursor.execute("DELETE FROM `moviedata`.`movie_specialeffects`;")
conn.commit()

# specialeffects
mycursor.execute("DELETE FROM `moviedata`.`specialeffects`;")
conn.commit()

# movie_produced
mycursor.execute("DELETE FROM `moviedata`.`movie_produced`;")
conn.commit()

# produced
mycursor.execute("DELETE FROM `moviedata`.`produced`;")
conn.commit()

# movie_director
mycursor.execute("DELETE FROM `moviedata`.`movie_director`;")
conn.commit()

# director
mycursor.execute("DELETE FROM `moviedata`.`director`;")
conn.commit()

# movie_editing
mycursor.execute("DELETE FROM `moviedata`.`movie_editing`;")
conn.commit()

# editing
mycursor.execute("DELETE FROM `moviedata`.`editing`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `moviedata`.`movie_cinematography`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `moviedata`.`cinematography`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `moviedata`.`movie_music`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `moviedata`.`music`;")
conn.commit()

# movie_cast
mycursor.execute("DELETE FROM `moviedata`.`movie_cast`;")
conn.commit()

# cast
mycursor.execute("DELETE FROM `moviedata`.`cast`;")
conn.commit()

# movie_writers
mycursor.execute("DELETE FROM `moviedata`.`movie_writers`;")
conn.commit()

# writers
mycursor.execute("DELETE FROM `moviedata`.`writers`;")
conn.commit()

# # movie_content
# mycursor.execute("DELETE FROM `moviedata`.`movie_content`;")
# conn.commit()

# # content
# mycursor.execute("DELETE FROM `moviedata`.`content` WHERE content_id < 100000;")
# conn.commit()

# movie_genres
mycursor.execute("DELETE FROM `moviedata`.`movie_genres`;")
conn.commit()

# genres
mycursor.execute("DELETE FROM `moviedata`.`genres`;")
conn.commit()

# movie_taglines
mycursor.execute("DELETE FROM `moviedata`.`movie_taglines`;")
conn.commit()

# taglines
mycursor.execute("DELETE FROM `moviedata`.`taglines`;")
conn.commit()

# did_you_know
mycursor.execute("DELETE FROM `moviedata`.`did_you_know`;")
conn.commit()

# country_origin
mycursor.execute("DELETE FROM `moviedata`.`country_origin`;")
conn.commit()

# official_site
mycursor.execute("DELETE FROM `moviedata`.`official_site`;")
conn.commit()

# language
mycursor.execute("DELETE FROM `moviedata`.`language`;")
conn.commit()

# filming_locations
mycursor.execute("DELETE FROM `moviedata`.`filming_locations`;")
conn.commit()

# production_companies
mycursor.execute("DELETE FROM `moviedata`.`production_companies`;")
conn.commit()

# sound_mix
mycursor.execute("DELETE FROM `moviedata`.`sound_mix`;")
conn.commit()

# color
mycursor.execute("DELETE FROM `moviedata`.`color`;")
conn.commit()

# aspect_ratio
mycursor.execute("DELETE FROM `moviedata`.`aspect_ratio`;")
conn.commit()

# camera
mycursor.execute("DELETE FROM `moviedata`.`camera`;")
conn.commit()

# laboratory
mycursor.execute("DELETE FROM `moviedata`.`laboratory`;")
conn.commit()

# negative_format
mycursor.execute("DELETE FROM `moviedata`.`negative_format`;")
conn.commit()

# cinematographic_process
mycursor.execute("DELETE FROM `moviedata`.`cinematographic_process`;")
conn.commit()

# printed_film_format
mycursor.execute("DELETE FROM `moviedata`.`printed_film_format`;")
conn.commit()

# ticket_room
mycursor.execute("DELETE FROM `moviedata`.`ticket_room`;")
conn.commit()

# awards
mycursor.execute("DELETE FROM `moviedata`.`awards`;")
conn.commit()

# film_review
mycursor.execute("DELETE FROM `moviedata`.`film_review`;")
conn.commit()

# rating
mycursor.execute("DELETE FROM `moviedata`.`rating`;")
conn.commit()

# movieinformation
mycursor.execute("DELETE FROM `moviedata`.`movieinformation`;")
conn.commit()

mycursor.close()
conn.close()