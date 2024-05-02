import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

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

mycursor.close()
conn.close()