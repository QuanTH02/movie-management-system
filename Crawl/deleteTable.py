import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

# Delete ----------------------------------------------------------------

# # movie_specialeffects
# mycursor.execute("DELETE FROM `filmdata`.`movie_specialeffects` WHERE movie_id = 1;")
# conn.commit()

# # specialeffects
# mycursor.execute("DELETE FROM `filmdata`.`specialeffects` WHERE special_effect_id < 1000;")
# conn.commit()

# # movie_produced
# mycursor.execute("DELETE FROM `filmdata`.`movie_produced` WHERE movie_id = 1;")
# conn.commit()

# # produced
# mycursor.execute("DELETE FROM `filmdata`.`produced` WHERE produced_id < 1000;")
# conn.commit()

# # movie_director
# mycursor.execute("DELETE FROM `filmdata`.`movie_director` WHERE movie_id = 1;")
# conn.commit()

# # director
# mycursor.execute("DELETE FROM `filmdata`.`director` WHERE director_id < 1000;")
# conn.commit()

# # movie_editing
# mycursor.execute("DELETE FROM `filmdata`.`movie_editing` WHERE movie_id = 1;")
# conn.commit()

# # editing
# mycursor.execute("DELETE FROM `filmdata`.`editing` WHERE editing_id < 1000;")
# conn.commit()

# # movie_music
# mycursor.execute("DELETE FROM `filmdata`.`movie_cinematography` WHERE movie_id = 1;")
# conn.commit()

# # music
# mycursor.execute("DELETE FROM `filmdata`.`cinematography` WHERE cinematography_id < 1000;")
# conn.commit()

# # movie_music
# mycursor.execute("DELETE FROM `filmdata`.`movie_music` WHERE movie_id = 1;")
# conn.commit()

# # music
# mycursor.execute("DELETE FROM `filmdata`.`music` WHERE music_id < 1000;")
# conn.commit()

# # movie_cast
# mycursor.execute("DELETE FROM `filmdata`.`movie_cast` WHERE movie_id = 1;")
# conn.commit()

# # cast
# mycursor.execute("DELETE FROM `filmdata`.`cast` WHERE cast_id < 1000;")
# conn.commit()

# # movie_writers
# mycursor.execute("DELETE FROM `filmdata`.`movie_writers` WHERE movie_id = 1;")
# conn.commit()

# # writers
# mycursor.execute("DELETE FROM `filmdata`.`writers` WHERE writers_id < 1000;")
# conn.commit()

# # # movie_content
# # mycursor.execute("DELETE FROM `filmdata`.`movie_content` WHERE movie_id = 1;")
# # conn.commit()

# # # content
# # mycursor.execute("DELETE FROM `filmdata`.`content` WHERE content_id < 1000;")
# # conn.commit()

# # movie_genres
# mycursor.execute("DELETE FROM `filmdata`.`movie_genres` WHERE movie_id = 1;")
# conn.commit()

# # genres
# mycursor.execute("DELETE FROM `filmdata`.`genres` WHERE genres_id < 1000;")
# conn.commit()

# # movie_taglines
# mycursor.execute("DELETE FROM `filmdata`.`movie_taglines` WHERE movie_id = 1;")
# conn.commit()

# # taglines
# mycursor.execute("DELETE FROM `filmdata`.`taglines` WHERE taglines_id < 1000;")
# conn.commit()

# # did_you_know
# mycursor.execute("DELETE FROM `filmdata`.`did_you_know` WHERE did_you_know_id < 1000;")
# conn.commit()

# # movieinformation
# mycursor.execute("DELETE FROM `filmdata`.`movieinformation` WHERE movie_id = 1;")
# conn.commit()


# movie_specialeffects
mycursor.execute("DELETE FROM `filmdata`.`movie_specialeffects`;")
conn.commit()

# specialeffects
mycursor.execute("DELETE FROM `filmdata`.`specialeffects`;")
conn.commit()

# movie_produced
mycursor.execute("DELETE FROM `filmdata`.`movie_produced`;")
conn.commit()

# produced
mycursor.execute("DELETE FROM `filmdata`.`produced`;")
conn.commit()

# movie_director
mycursor.execute("DELETE FROM `filmdata`.`movie_director`;")
conn.commit()

# director
mycursor.execute("DELETE FROM `filmdata`.`director`;")
conn.commit()

# movie_editing
mycursor.execute("DELETE FROM `filmdata`.`movie_editing`;")
conn.commit()

# editing
mycursor.execute("DELETE FROM `filmdata`.`editing`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `filmdata`.`movie_cinematography`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `filmdata`.`cinematography`;")
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `filmdata`.`movie_music`;")
conn.commit()

# music
mycursor.execute("DELETE FROM `filmdata`.`music`;")
conn.commit()

# movie_cast
mycursor.execute("DELETE FROM `filmdata`.`movie_cast`;")
conn.commit()

# cast
mycursor.execute("DELETE FROM `filmdata`.`cast`;")
conn.commit()

# movie_writers
mycursor.execute("DELETE FROM `filmdata`.`movie_writers`;")
conn.commit()

# writers
mycursor.execute("DELETE FROM `filmdata`.`writers`;")
conn.commit()

# # movie_content
# mycursor.execute("DELETE FROM `filmdata`.`movie_content` WHERE movie_id = 1;")
# conn.commit()

# # content
# mycursor.execute("DELETE FROM `filmdata`.`content` WHERE content_id < 1000;")
# conn.commit()

# movie_genres
mycursor.execute("DELETE FROM `filmdata`.`movie_genres`;")
conn.commit()

# genres
mycursor.execute("DELETE FROM `filmdata`.`genres`;")
conn.commit()

# movie_taglines
mycursor.execute("DELETE FROM `filmdata`.`movie_taglines`;")
conn.commit()

# taglines
mycursor.execute("DELETE FROM `filmdata`.`taglines`;")
conn.commit()

# did_you_know
mycursor.execute("DELETE FROM `filmdata`.`did_you_know`;")
conn.commit()

# country_origin
mycursor.execute("DELETE FROM `filmdata`.`country_origin`;")
conn.commit()

# official_site
mycursor.execute("DELETE FROM `filmdata`.`official_site`;")
conn.commit()

# language
mycursor.execute("DELETE FROM `filmdata`.`language`;")
conn.commit()

# filming_locations
mycursor.execute("DELETE FROM `filmdata`.`filming_locations`;")
conn.commit()

# production_companies
mycursor.execute("DELETE FROM `filmdata`.`production_companies`;")
conn.commit()

# sound_mix
mycursor.execute("DELETE FROM `filmdata`.`sound_mix`;")
conn.commit()

# color
mycursor.execute("DELETE FROM `filmdata`.`color`;")
conn.commit()

# aspect_ratio
mycursor.execute("DELETE FROM `filmdata`.`aspect_ratio`;")
conn.commit()

# camera
mycursor.execute("DELETE FROM `filmdata`.`camera`;")
conn.commit()

# laboratory
mycursor.execute("DELETE FROM `filmdata`.`laboratory`;")
conn.commit()

# negative_format
mycursor.execute("DELETE FROM `filmdata`.`negative_format`;")
conn.commit()

# cinematographic_process
mycursor.execute("DELETE FROM `filmdata`.`cinematographic_process`;")
conn.commit()

# printed_film_format
mycursor.execute("DELETE FROM `filmdata`.`printed_film_format`;")
conn.commit()

# ticket_room
mycursor.execute("DELETE FROM `filmdata`.`ticket_room`;")
conn.commit()

# awards
mycursor.execute("DELETE FROM `filmdata`.`awards`;")
conn.commit()

# film_review
mycursor.execute("DELETE FROM `filmdata`.`film_review`;")
conn.commit()

# rating
mycursor.execute("DELETE FROM `filmdata`.`rating`;")
conn.commit()

# movieinformation
mycursor.execute("DELETE FROM `filmdata`.`movieinformation`;")
conn.commit()

mycursor.close()
conn.close()