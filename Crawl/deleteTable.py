import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

# Delete ----------------------------------------------------------------

# user_name_fake
mycursor.execute("DELETE FROM `submitdata`.`user_name_fake`;")
conn.commit()

# like_movie
mycursor.execute("DELETE FROM `submitdata`.`like_movie` WHERE `movie_id` > 250;")
conn.commit()

# link_img
mycursor.execute("DELETE FROM `submitdata`.`movie_img` WHERE `movie_id` > 250;")
conn.commit()

# # link_img
# mycursor.execute("DELETE FROM `submitdata`.`link_img`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`link_img`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`link_img` ORDER BY link_img_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# link_trailler
mycursor.execute("DELETE FROM `submitdata`.`movie_trailler` WHERE `movie_id` > 250;")
conn.commit()

# # link_trailler
# mycursor.execute("DELETE FROM `submitdata`.`link_trailler`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`link_trailler`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`link_trailler` ORDER BY link_trailler_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_img
mycursor.execute("DELETE FROM `submitdata`.`movie_img` WHERE `movie_id` > 250;")
conn.commit()

# movie_trailler
mycursor.execute("DELETE FROM `submitdata`.`movie_trailler` WHERE `movie_id` > 250;")
conn.commit()

# follow_film_user
mycursor.execute("DELETE FROM `submitdata`.`follow_film_user` WHERE `movie_id` > 250;")
conn.commit()

mycursor.execute("DELETE FROM `submitdata`.`movie_specialeffects` WHERE movie_id > 250")

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`specialeffects`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`specialeffects` ORDER BY special_effect_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_produced
mycursor.execute("DELETE FROM `submitdata`.`movie_produced` WHERE `movie_id` > 250;")
conn.commit()

# produced
# mycursor.execute("DELETE FROM `submitdata`.`produced`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`produced`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`produced` ORDER BY produced_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_director
mycursor.execute("DELETE FROM `submitdata`.`movie_director` WHERE `movie_id` > 250;")
conn.commit()

# director
# mycursor.execute("DELETE FROM `submitdata`.`director`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`director`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`director` ORDER BY director_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `submitdata`.`movie_cinematography` WHERE `movie_id` > 250;")
conn.commit()

# music
# mycursor.execute("DELETE FROM `submitdata`.`cinematography`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`cinematography`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`cinematography` ORDER BY cinematography_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_music
mycursor.execute("DELETE FROM `submitdata`.`movie_music` WHERE `movie_id` > 250;")
conn.commit()

# music
# mycursor.execute("DELETE FROM `submitdata`.`music`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`music`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`music` ORDER BY music_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_cast
mycursor.execute("DELETE FROM `submitdata`.`movie_cast` WHERE `movie_id` > 250;")
conn.commit()

# cast
# mycursor.execute("DELETE FROM `submitdata`.`cast`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`cast`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`cast` ORDER BY cast_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_writers
mycursor.execute("DELETE FROM `submitdata`.`movie_writers` WHERE `movie_id` > 250;")
conn.commit()

# writers
# mycursor.execute("DELETE FROM `submitdata`.`writers`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`writers`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`writers` ORDER BY writers_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# # movie_content
# mycursor.execute("DELETE FROM `submitdata`.`movie_content`;")
# conn.commit()

# # content
# mycursor.execute("DELETE FROM `submitdata`.`content` WHERE content_id < 100000;")
# conn.commit()

# movie_genres
mycursor.execute("DELETE FROM `submitdata`.`movie_genres` WHERE `movie_id` > 250;")
conn.commit()

# genres
# mycursor.execute("DELETE FROM `submitdata`.`genres`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`genres`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`genres` ORDER BY genres_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# movie_taglines
mycursor.execute("DELETE FROM `submitdata`.`movie_taglines` WHERE `movie_id` > 250;")
conn.commit()

# taglines
# mycursor.execute("DELETE FROM `submitdata`.`taglines`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`taglines`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`taglines` ORDER BY taglines_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# did_you_know
mycursor.execute("DELETE FROM `submitdata`.`did_you_know` WHERE `movie_id` > 250;")
conn.commit()

# movie_specialeffects
mycursor.execute("DELETE FROM `submitdata`.`movie_specialeffects` WHERE `movie_id` > 250;")
conn.commit()

# movie_produced
mycursor.execute("DELETE FROM `submitdata`.`movie_produced` WHERE `movie_id` > 250;")
conn.commit()

# produced
# mycursor.execute("DELETE FROM `submitdata`.`produced`;")
# conn.commit()

# 
# 
# mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`produced`")
# count = mycursor.fetchone()[0]

# delete_query = "DELETE FROM `submitdata`.`produced` ORDER BY produced_id DESC LIMIT %s"
# mycursor.execute(delete_query, (count * 1 // 3,))
# conn.commit()

# movie_director
mycursor.execute("DELETE FROM `submitdata`.`movie_director` WHERE `movie_id` > 250;")
conn.commit()

# movie_editing
mycursor.execute("DELETE FROM `submitdata`.`movie_editing` WHERE `movie_id` > 250;")
conn.commit()

# editing
# mycursor.execute("DELETE FROM `submitdata`.`editing`;")
# conn.commit()

mycursor.execute("SELECT COUNT(*) FROM `submitdata`.`editing`")
count = mycursor.fetchone()[0]

delete_query = "DELETE FROM `submitdata`.`editing` ORDER BY editing_id DESC LIMIT %s"
mycursor.execute(delete_query, (count * 2 // 3,))
conn.commit()

# # movie_content
# mycursor.execute("DELETE FROM `submitdata`.`movie_content`;")
# conn.commit()

# # content
# mycursor.execute("DELETE FROM `submitdata`.`content` WHERE content_id < 100000;")
# conn.commit()

# country_origin
mycursor.execute("DELETE FROM `submitdata`.`country_origin` WHERE `movie_id` > 250;")
conn.commit()

# official_site
mycursor.execute("DELETE FROM `submitdata`.`official_site` WHERE `movie_id` > 250;")
conn.commit()

# language
mycursor.execute("DELETE FROM `submitdata`.`language` WHERE `movie_id` > 250;")
conn.commit()

# filming_locations
mycursor.execute("DELETE FROM `submitdata`.`filming_locations` WHERE `movie_id` > 250;")
conn.commit()

# production_companies
mycursor.execute("DELETE FROM `submitdata`.`production_companies` WHERE `movie_id` > 250;")
conn.commit()

# sound_mix
mycursor.execute("DELETE FROM `submitdata`.`sound_mix` WHERE `movie_id` > 250;")
conn.commit()

# color
mycursor.execute("DELETE FROM `submitdata`.`color` WHERE `movie_id` > 250;")
conn.commit()

# aspect_ratio
mycursor.execute("DELETE FROM `submitdata`.`aspect_ratio` WHERE `movie_id` > 250;")
conn.commit()

# camera
mycursor.execute("DELETE FROM `submitdata`.`camera` WHERE `movie_id` > 250;")
conn.commit()

# laboratory
mycursor.execute("DELETE FROM `submitdata`.`laboratory` WHERE `movie_id` > 250;")
conn.commit()

# negative_format
mycursor.execute("DELETE FROM `submitdata`.`negative_format` WHERE `movie_id` > 250;")
conn.commit()

# cinematographic_process
mycursor.execute("DELETE FROM `submitdata`.`cinematographic_process` WHERE `movie_id` > 250;")
conn.commit()

# printed_film_format
mycursor.execute("DELETE FROM `submitdata`.`printed_film_format` WHERE `movie_id` > 250;")
conn.commit()

# ticket_room
mycursor.execute("DELETE FROM `submitdata`.`ticket_room` WHERE `movie_id` > 250;")
conn.commit()

# awards
mycursor.execute("DELETE FROM `submitdata`.`awards` WHERE `movie_id` > 250;")
conn.commit()

# film_review
mycursor.execute("DELETE FROM `submitdata`.`film_review` WHERE `movie_id` > 250;")
conn.commit()

# rating
mycursor.execute("DELETE FROM `submitdata`.`rating` WHERE `movie_id` > 250;")
conn.commit()

# movieinformation
mycursor.execute("DELETE FROM `submitdata`.`movieinformation` WHERE `movie_id` > 250;")
conn.commit()

mycursor.close()
conn.close()