import requests
from bs4 import BeautifulSoup
import re
import json

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

            return arr
            
        else:
            return ""
    else:
        return ""

def main():
    with open('./Crawl/autoUpdate/movies.json', 'r', encoding='utf-8') as json_file:
        all_movie = json.load(json_file)

    link_img_id = 1
    link_trailer_id = 1

    with open('./Crawl/autoUpdate/update.sql', 'w', encoding='utf-8') as f:
        f.write(f"DELETE FROM `alldata`.`movie_img`;\n")
        f.write(f"DELETE FROM `alldata`.`link_img`;\n")
        f.write(f"DELETE FROM `alldata`.`movie_trailler`;\n")
        f.write(f"DELETE FROM `alldata`.`link_trailler`;\n")

        for movie in all_movie:
            movie_id = movie["movie_id"]
            link_img_main = movie["link_img"]
            link_trailer_main = movie["link_trailer"]

            new_link_img = main_link_img(link_img_main)
            new_link_trailer = main_link_trailer(link_trailer_main)

            str_update_main_img = f"UPDATE `alldata`.`movieinformation` SET `main_img` = '{new_link_img}' WHERE `movie_id` = {movie_id};\n"
            f.write(str_update_main_img)

            str_update_main_trailer = f"UPDATE `alldata`.`movieinformation` SET `main_trailer` = '{new_link_trailer}' WHERE `movie_id` = {movie_id};\n"
            f.write(str_update_main_trailer)

            all_link_img = return_all_link_img(link_img_main)

            str_insert_to_link_img = f"INSERT INTO `alldata`.`link_img` (`link_img_id`, `link_img`) VALUES ({link_img_id}, '{new_link_img}');\n"
            f.write(str_insert_to_link_img)

            str_insert_to_movie_img = f"INSERT INTO `alldata`.`movie_img` (`movie_id`, `link_img_id`) VALUES ({movie_id}, {link_img_id});\n"
            f.write(str_insert_to_movie_img)

            link_img_id += 1

            for link_img_for in all_link_img:
                str_insert_to_link_img = f"INSERT INTO `alldata`.`link_img` (`link_img_id`, `link_img`) VALUES ({link_img_id}, '{link_img_for}');\n"
                f.write(str_insert_to_link_img)

                str_insert_to_movie_img = f"INSERT INTO `alldata`.`movie_img` (`movie_id`, `link_img_id`) VALUES ({movie_id}, {link_img_id});\n"
                f.write(str_insert_to_movie_img)

                link_img_id += 1

            str_insert_to_link_trailer = f"INSERT INTO `alldata`.`link_trailler` (`link_trailler_id`, `link_trailler`) VALUES ({link_trailer_id}, '{new_link_trailer}');\n"
            f.write(str_insert_to_link_trailer)

            str_insert_to_movie_trailer = f"INSERT INTO `alldata`.`movie_trailler` (`movie_id`, `link_trailler_id`) VALUES ({movie_id}, {link_trailer_id});\n"
            f.write(str_insert_to_movie_trailer)

            link_trailer_id += 1


if __name__ == "__main__":
    main()
    # mycursor.execute("DELETE FROM `movie`.`movie_img` WHERE link_img_id > 0;")
    # conn.commit()

    # mycursor.execute("DELETE FROM `movie`.`link_img` WHERE link_img_id > 0;")
    # conn.commit()