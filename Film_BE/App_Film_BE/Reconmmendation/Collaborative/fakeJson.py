import mysql.connector
import csv

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

def check_user_name(user_name):
    if "January" in user_name or "February" in user_name or "March" in user_name or "April" in user_name or "May" in user_name or "June" in user_name or "July" in user_name or "August" in user_name or "September" in user_name or "October" in user_name or "November" in user_name or "December" in user_name:
        return False
    return True

def main():
    str_select_all_distinct_film_review = "SELECT DISTINCT(name_review) FROM `alldata`.`film_review`;"
    mycursor.execute(str_select_all_distinct_film_review)
    select_all_distinct_film_review = mycursor.fetchall()

    with open("output.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["user_name", "movie_id", "rating"])

        for name in select_all_distinct_film_review:
            if check_user_name(name[0]):
                str_select_film_review_name_review = "SELECT * FROM `alldata`.`film_review` WHERE `name_review` = '" + str(name[0]) + "';"
                mycursor.execute(str_select_film_review_name_review)
                
                select_film_review_name_review = mycursor.fetchall()

                for film_review in select_film_review_name_review:
                    writer.writerow([film_review[4], film_review[1], film_review[2].split("/")[0]])

if __name__ == "__main__":
    main()