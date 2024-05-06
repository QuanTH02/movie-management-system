import mysql.connector

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

# follow_film_user
mycursor.execute("DELETE FROM `filmdata`.`follow_film_user`;")
conn.commit()

# like_movie
mycursor.execute("DELETE FROM `filmdata`.`like_movie`;")
conn.commit()
