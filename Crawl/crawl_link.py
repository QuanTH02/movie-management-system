import requests
from bs4 import BeautifulSoup
import re
import mysql.connector
import time

def search_link(str, str1):
    pattern = re.escape(str1) + r'[^"]*'

    match = re.search(pattern, str)

    if match:
        str2 = match.group(0)
        return str2
    else:
        return ""
    
def main_link_trailer(url_page):
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
    headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

    url = url_page
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        link = search_link(str(soup), "https://imdb-video.media-imdb.com/")
        soup = str(soup).replace(link, "")

        link1 = search_link(str(soup), "https://imdb-video.media-imdb.com/").replace("\\u0026", "&")
        return link1
    else:
        return ""
    
def main_link_img(url_page):
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
    headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

    url = url_page
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        link = search_link(str(soup), "https://m.media-amazon.com/images/").replace("\\u0026", "&")
        return link
    else:
        return ""
    
def return_all_link_img(link):
    sub_link_img = link.find("mediaviewer")
    link_all = link[:sub_link_img] + "mediaindex/"

    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
    headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

    url = link_all
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        sub_section_images = soup.find(attrs={"data-testid": "sub-section-images"})
    
        if sub_section_images:
            img_tags = sub_section_images.find_all('img')
            arr = []
            for img_tag in img_tags:
                src = img_tag.get('src')
                if src:
                    arr.append(src)

            # print(arr)
            # print(len(arr))
            return arr
            
        else:
            return ""
    else:
        return ""

def main():
    
    str_select = "SELECT * FROM `moviedata`.`movieinformation`;"
    mycursor.execute(str_select)
    all_movie = mycursor.fetchall()

    str_select_count_link_img = "SELECT COUNT(*) FROM `moviedata`.`link_img`;"
    mycursor.execute(str_select_count_link_img)
    count_link_img = mycursor.fetchone()[0]
    link_img_id = count_link_img + 1

    str_select_count_link_trailler = "SELECT COUNT(*) FROM `moviedata`.`link_trailler`;"
    mycursor.execute(str_select_count_link_trailler)
    count_link_trailler = mycursor.fetchone()[0]
    link_trailler_id = count_link_trailler + 1

    for movie in all_movie:
        movie_id = movie[0]
        if movie_id < 126:
            continue
        print(movie_id)
        link_img_main = movie[6]
        link_trailer_main = movie[7]

        new_link_img = main_link_img(link_img_main)
        new_link_trailer = main_link_trailer(link_trailer_main)

        str_update_main_img = "UPDATE `moviedata`.`movieinformation` SET `main_img` = %s WHERE `movie_id` = %s;"
        val = (new_link_img, movie_id)
        mycursor.execute(str_update_main_img, val)
        conn.commit()

        str_update_main_trailer = "UPDATE `moviedata`.`movieinformation` SET `main_trailer` = %s WHERE `movie_id` = %s;"
        val = (new_link_trailer, movie_id)
        mycursor.execute(str_update_main_trailer, val)
        conn.commit()

        all_link_img = return_all_link_img(link_img_main)

        str_insert_to_link_img = "INSERT INTO `moviedata`.`link_img` (`link_img_id`, `link_img`) VALUES (%s, %s);"
        val = (link_img_id, new_link_img)
        mycursor.execute(str_insert_to_link_img, val)
        conn.commit()

        str_insert_to_movie_img = "INSERT INTO `moviedata`.`movie_img` (`movie_id`, `link_img_id`) VALUES (%s, %s);"
        val = (movie_id, link_img_id)
        mycursor.execute(str_insert_to_movie_img, val)
        conn.commit()

        link_img_id += 1

        for link_img_for in all_link_img:
            str_insert_to_link_img = "INSERT INTO `moviedata`.`link_img` (`link_img_id`, `link_img`) VALUES (%s, %s);"
            val = (link_img_id, link_img_for)
            mycursor.execute(str_insert_to_link_img, val)
            conn.commit()

            str_insert_to_movie_img = "INSERT INTO `moviedata`.`movie_img` (`movie_id`, `link_img_id`) VALUES (%s, %s);"
            val = (movie_id, link_img_id)
            mycursor.execute(str_insert_to_movie_img, val)
            conn.commit()

            link_img_id += 1

        str_insert_to_link_trailer = "INSERT INTO `moviedata`.`link_trailler` (`link_trailler_id`, `link_trailler`) VALUES (%s, %s);"
        val = (link_trailler_id, new_link_trailer)
        mycursor.execute(str_insert_to_link_trailer, val)
        conn.commit()

        str_insert_to_movie_trailer = "INSERT INTO `moviedata`.`movie_trailler` (`movie_id`, `link_trailler_id`) VALUES (%s, %s);"
        val = (movie_id, link_trailler_id)
        mycursor.execute(str_insert_to_movie_trailer, val)
        conn.commit()

        link_trailler_id += 1


if __name__ == "__main__":
    
    conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
    mycursor = conn.cursor()
    main()

    # mycursor.execute("DELETE FROM `moviedata`.`movie_img`;")
    # conn.commit()

    # mycursor.execute("DELETE FROM `moviedata`.`link_img`;")
    # conn.commit()

    # mycursor.execute("DELETE FROM `moviedata`.`movie_trailler`;")
    # conn.commit()

    # mycursor.execute("DELETE FROM `moviedata`.`link_trailler`;")
    # conn.commit()