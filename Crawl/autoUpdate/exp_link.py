import mysql.connector
import json

if __name__ == "__main__":
    conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
    cursor = conn.cursor()

    str_select = "SELECT movie_id, link_img, link_trailer FROM `alldata`.`movieinformation`;"

    cursor.execute(str_select)

    rows = cursor.fetchall()
    
    data = []
    for row in rows:
        data.append({
            "movie_id": row[0],
            "link_img": row[1],
            "link_trailer": row[2]
        })

    with open('movies.json', 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

    cursor.close()
    conn.close()