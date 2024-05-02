import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()
page_main_url = "https://www.imdb.com/search/title/?genres=action&start=1&explore=title_type,genres&ref_=adv_nxt&title_type=feature"
driver = webdriver.Chrome()
driver.get(page_main_url)

time.sleep(2)

str_count = "SELECT COUNT(*) FROM `filmdata`.`movieinformation`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
movie_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`writers`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
writers_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`cast`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cast_id = count + 1

sstr_counttr = "SELECT COUNT(*) FROM `filmdata`.`music`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
music_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`cinematography`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cinematography_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`editing`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
editing_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`director`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
director_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`produced`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
produced_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`specialeffects`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
special_effect_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`genres`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
genres_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`taglines`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
taglines_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`did_you_know`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
did_you_know_id = count + 1

# New #################################################################
# New #################################################################
str_count = "SELECT COUNT(*) FROM `filmdata`.`country_origin`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
country_origin_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`official_site`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
official_site_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`language`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
language_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`filming_locations`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
filming_locations_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`production_companies`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
production_companies_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`sound_mix`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
sound_mix_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`color`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
color_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`aspect_ratio`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
aspect_ratio_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`camera`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
camera_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`laboratory`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
laboratory_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`negative_format`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
negative_format_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`cinematographic_process`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cinematographic_process_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`printed_film_format`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
printed_film_format_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`ticket_room`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
ticket_room_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`awards`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
awards_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`film_review`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
film_review_id = count + 1

str_count = "SELECT COUNT(*) FROM `filmdata`.`rating`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
rating_id = count + 1

link = []

for i in range(movie_id, movie_id + 10):
    element_a_to_film = "//*[@id=\"main\"]/div/div[3]/div/div[" + str(i) + "]/div[3]/h3/a"
    link_film = driver.find_elements(By.XPATH, element_a_to_film)[0].get_attribute("href")
    link.append(link_film)

for i in link:
    movie_id += 1
    page_url = i
    driver.get(page_url)

    driver.execute_script("window.scrollTo(0, 3000);")
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, 3500);")
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, 4000);")
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, 4500);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 5000);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 5500);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 6000);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 6500);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 7000);")
    time.sleep(3)

    # Genres
    genres = []
    genres_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[2]/div/ul/li")
    # genres_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[2]/div/ul/li[10]")
    if(genres_elements != None):
        for value in genres_elements:
            genres.append(value.text)
            print(value.text)

    print(genres)

    #Movie information: Thông tin phim ************************
    # MOVIE
    movie_name_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/h1/span")
    movie_name = movie_name_elements[0].text
    print("Tên phim: " + movie_name)

    year_manufacture_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[1]/a")
    year_manufacture = year_manufacture_elements[0].text
    print("Sản xuất năm: " + year_manufacture)

    xpath_list = [
        "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]",
        "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[2]"
    ]

    for xpath in xpath_list:
        time_elements = driver.find_elements(By.XPATH, xpath)
        if time_elements:
            break

    if time_elements:
        time_movie = time_elements[0].text
        print("Thời lượng: " + time_movie)

    # time_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]")
    # time_movie = time_elements[0].text
    # print("Thời lượng: " + time_movie)

    element_trailer = driver.find_elements(By.CLASS_NAME, "ipc-lockup-overlay")
    link_img = element_trailer[0].get_attribute("href")
    link_trailer = element_trailer[1].get_attribute("href")

    print("Img: " + link_img)
    print("Trailer: " + link_trailer)

    # describe = []
    describe_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p")
    describe = describe_elements[0].text
    print(describe_elements[0].text)

    # storyline = []
    # storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")
    
    # if storyline_elements:
    #     storyline = storyline_elements[0].text
    # else:
    #     storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/div[1]/div/div/div")
    #     storyline = storyline_elements[0].text

    # print(storyline_elements[0].text)


    xpath_list = [
        "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div",
        "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/div[1]/div/div/div",
        "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[5]/div[2]/div[1]/div/div/div"
    ]

    for xpath in xpath_list:
        storyline_elements = driver.find_elements(By.XPATH, xpath)
        if storyline_elements:
            break

    if storyline_elements:
        storyline = storyline_elements[0].text
        print(storyline)


    taglines = []
    link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]")
    
    if link_taglines:
        link_to_taglines = link_taglines[0].get_attribute("href")
    else:
        link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/ul[2]/li[1]/a[2]")
        if link_taglines:
            link_to_taglines = link_taglines[0].get_attribute("href")

    # Did_you_know
    did_you_know = []
    did_you_know_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div")

    id = 1

    for value in did_you_know_elements:
        if id == 1:
            id += 1
            continue
        # time.sleep(3)
        did_you_know_comments = []
        element_a_to_comment = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[" + str(id) + "]/ul/li/a[2]"

        # title_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[" + str(id) + "]/ul/li/a[1]"
        # if title_comment_element:
        #     title_dyk = driver.find_elements(By.XPATH, title_comment_element)
        # else:
        #     title_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[1]"
        #     if title_comment_element:
        #         title_dyk = driver.find_elements(By.XPATH, title_comment_element)
        #     else:
        #         title_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[" + str(id) + "]/ul/li/a[1]"
        #         if title_comment_element:
        #             title_dyk = driver.find_elements(By.XPATH, title_comment_element)

        xpath_list = [
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[" + str(id) + "]/ul/li/a[1]",
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[1]",
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[" + str(id) + "]/ul/li/a[1]"
        ]

        title_dyk = None
        for xpath in xpath_list:
            title_dyk = driver.find_elements(By.XPATH, xpath)
            if title_dyk:
                break
        

        # content_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[" + str(id) + "]/ul/li/div"
        # if content_comment_element:
        #     content_comment_dyk = driver.find_elements(By.XPATH, content_comment_element)
        # else:
        #     content_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/div"
        #     if content_comment_element:
        #         content_comment_dyk = driver.find_elements(By.XPATH, content_comment_element)
        #     else:
        #         content_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[" + str(id) + "]/ul/li/div"
        #         if content_comment_element:
        #             content_comment_dyk = driver.find_elements(By.XPATH, content_comment_element)

        content_comment_dyk = None 

        xpath_list = [
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[" + str(id) + "]/ul/li/div",
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/div",
            "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[" + str(id) + "]/ul/li/div"
        ]

        for xpath in xpath_list:
            content_comment_dyk = driver.find_elements(By.XPATH, xpath)
            if content_comment_dyk:
                break

        if title_dyk:
            did_you_know_comments.append(title_dyk[0].text)
            did_you_know_comments.append(content_comment_dyk[0].text)

            print(title_dyk[0].text, ": ", content_comment_dyk[0].text)

            did_you_know += [did_you_know_comments]
            # id += 1
        #     ################################################
        #     did_you_know_link_comments = driver.find_elements(By.XPATH, element_a_to_comment)
        #     link_to_comments = did_you_know_link_comments[0].get_attribute("href")


        #     # Vào comment của từng mục
        #     driver.get(link_to_comments)
        #     time.sleep(5)

        #     # Lấy tất cả các thẻ comment

        #     # Tắt thông báo
        #     click_button_exit_elements = driver.find_elements(By.XPATH, "/html/body/div[4]/div[2]/div/div[1]/button")
            
        #     if(click_button_exit_elements):
        #         click_button_exit_elements[0].click()
        #         time.sleep(2)

        #     # # Bấm vào mục mở rộng để có nhiều comment hơn
        #     # click_button_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div[11]/div/span[2]/button")
        #     # click_button_elements[0].click()

        #     # time.sleep(3)

        #     did_you_know_comment_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div")
        #     id_comment = 1

        #     for value_comment in did_you_know_comment_elements:
        #         if id_comment % 2 == 0:
        #             content_element = "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div["+ str(id_comment) +"]/div/div[2]"
        #             comment_elements = driver.find_elements(By.XPATH, content_element)
        #             did_you_know_comments.append(comment_elements[0].text)
        #             print(int(id_comment/2), ":", comment_elements[0].text)

        #         id_comment += 1

        #     did_you_know += [did_you_know_comments]
        #     print(did_you_know_comments)
            
        #     # Quay lại trang chính của phim
        #     # driver.get(page_url)
        #     driver.back()
        #     driver.execute_script("window.scrollTo(0, 5000);")
        #     time.sleep(5)
        id += 1
    ################################################
    # print("Did you know\n")
    # for i in did_you_know:
    #     print("Did you know: ", i)

    # insert_str = "INSERT INTO `filmdata`.`movieinformation` (`movie_id`, `movie_name`, `year_manufacture`, `time`, `link_img`, `link_trailer`) VALUES ( %s, %s, %s, %s, %s, %s)"
    # data = (movie_id, movie_name, year_manufacture, time_movie, link_img, link_trailer)
    # mycursor.execute(insert_str, data)

    # conn.commit()

    #All cast & crew: Tất cả ekip ***********************
    #Crawl link cast & crew
    # link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]")
    # if link_all_cast_crew:
    #     link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")
    # else:
    #     link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[3]/ul/li[3]/a[2]")
    #     link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")
    
    xpath_list = [
        "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]",
        "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[3]/ul/li[3]/a[2]"
    ]

    link_all_cast_crew = None
    for xpath in xpath_list:
        link_all_cast_crew = driver.find_elements(By.XPATH, xpath)
        if link_all_cast_crew:
            break

    if link_all_cast_crew:
        link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")
        driver.get(link_to_all_cast_crew)


    #writers
    writers = []
    writers_role = []
    writers_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[2]/tbody/tr")
    print("Writers: ")
    for value in writers_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            writers.append(splitted[0])
            writers_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            writers.append(splitted[0])
            writers_role.append("")

    #cast and stars
    stars = []
    cast_name = []
    cast_role = []
    cast_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[3]/tbody/tr")
    print("Cast: ")
    for value in cast_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            cast_name.append(splitted[0])
            cast_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            cast_name.append(splitted[0])
            cast_role.append("")
        if (value == cast_elements[0] or value == cast_elements[1] or value == cast_elements[2] or value == cast_elements[3]) and len(splitted) > 1:
            stars.append(splitted[0])

    #music
    music = []
    music_role = []
    music_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[5]/tbody/tr")
    print("Music: ")
    for value in music_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            music.append(splitted[0])
            music_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            music.append(splitted[0])
            music_role.append("")

    #cinematography
    cinematography = []
    cinematography_role = []
    cinematography_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[6]/tbody/tr")
    print("Cinematography: ")
    for value in cinematography_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            cinematography.append(splitted[0])
            cinematography_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            cinematography.append(splitted[0])
            cinematography_role.append("")

    #editing
    editing = []
    editing_role = []
    editing_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[7]/tbody/tr")
    print("Editing: ")
    for value in editing_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            editing.append(splitted[0])
            editing_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            editing.append(splitted[0])
            editing_role.append("")

    #director
    director_name = []
    director_describe = []
    director_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[1]/tbody/tr")
    print("Director: ")
    for value in director_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            director_name.append(splitted[0])
            director_describe.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            director_name.append(splitted[0])
            director_describe.append("")

    #produced
    produced_name = []
    produced_role = []
    produced_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[4]/tbody/tr")
    print("Produced: ")
    for value in produced_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            produced_name.append(splitted[0])
            produced_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            produced_name.append(splitted[0])
            produced_role.append("")

    #special effects
    special_effect_name = []
    special_effect_role = []
    special_effect_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[18]/tbody/tr")
    print("Special Effects: ")
    for value in special_effect_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            print("name: " + splitted[0] + "; describe: " + splitted[1])
            special_effect_name.append(splitted[0])
            special_effect_role.append(splitted[1])
        if len(splitted) == 1:
            print("name: " + splitted[0])
            special_effect_name.append(splitted[0])
            special_effect_role.append("")

    #Content
    # driver.back()

    # describe = []
    # describe_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p")
    # describe.append(describe_elements[0].text)
    # print(describe_elements[0].text)

    # storyline = []
    # storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")
    # storyline.append(storyline_elements[0].text)
    # print(storyline_elements[0].text)

    # taglines = []
    # link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]")
    # link_to_taglines = link_taglines[0].get_attribute("href")

    if link_taglines:
        driver.get(link_to_taglines)

    time.sleep(3)

    taglines_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div/ul/li")
    for value in taglines_elements:
        taglines.append(value.text)
        print(value.text)

    # print("Describe: ")
    # for value in describe:
    #     print(value)

    # print("Storyline: ")
    # for value in storyline:
    #     print(value)

    # print("Taglines: ")
    # for value in describe:
    #     print(taglines)


    insert_str = "INSERT INTO `filmdata`.`movieinformation` (`movie_id`, `movie_name`, `year_manufacture`, `time`, `link_img`, `link_trailer`, `describe_movie`, `storyline`) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s)"
    data = (movie_id, movie_name, year_manufacture, time_movie, link_img, link_trailer, describe, storyline)
    mycursor.execute(insert_str, data)

    conn.commit()

    #########################################################################################################################################################################
    #########################################################################################################################################################################
    #########################################################################################################################################################################
    # insert Writers table -------------------------------------------------------
    # insert_str = "INSERT INTO `filmdata`.`allcastcrew` (`movie_id`, `writers`, `stars`, `music`, `cinematography`, `editing`) VALUES ( %s, %s, %s, %s, %s, %s)"
    insert_str = "INSERT INTO `filmdata`.`writers` (`writers_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # writers_id = 1

    for i in range(len(writers)):
        data = (writers_id, writers[i] , writers_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_writers` (`movie_id`, `writers_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, writers_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        writers_id += 1



    # insert Cast table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`cast` (`cast_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # cast_id = 1

    for i in range(len(cast_name)):
        data = (cast_id, cast_name[i] , cast_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_cast` (`movie_id`, `cast_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, cast_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        cast_id += 1

    # insert Music table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`music` (`music_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # music_id = 1

    for i in range(len(music)):
        data = (music_id, music[i] , music_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_music` (`movie_id`, `music_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, music_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        music_id += 1


    # insert Cinematography table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`cinematography` (`cinematography_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # cinematography_id = 1

    for i in range(len(cinematography)):
        data = (cinematography_id, cinematography[i] , cinematography_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_cinematography` (`movie_id`, `cinematography_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, cinematography_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        cinematography_id += 1

    # insert Editing table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`editing` (`editing_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # editing_id = 1

    for i in range(len(editing)):
        data = (editing_id, editing[i] , editing_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_editing` (`movie_id`, `editing_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, editing_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        editing_id += 1


    # insert Director table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`director` (`director_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # director_id = 1

    for i in range(len(director_name)):
        data = (director_id, director_name[i] , director_describe[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_director` (`movie_id`, `director_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, director_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        director_id += 1


    # insert Produced table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`produced` (`produced_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # produced_id = 1

    for i in range(len(produced_name)):
        data = (produced_id, produced_name[i] , produced_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_produced` (`movie_id`, `produced_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, produced_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        produced_id += 1


    # insert Special Effects table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`specialeffects` (`special_effect_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # special_effect_id = 1

    for i in range(len(special_effect_name)):
        data = (special_effect_id, special_effect_name[i] , special_effect_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_specialeffects` (`movie_id`, `special_effect_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, special_effect_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        special_effect_id += 1

    # # insert Content table -------------------------------------------------------
    # insert_str = "INSERT INTO `filmdata`.`content` (`content_id`, `describe`, `storyline`, `taglines`) VALUES (%s, %s, %s, %s)"
    # content_id = 1

    # for i in range(len(special_effect_name)):
    #     data = (content_id, special_effect_name[i] , special_effect_role[i])
    #     mycursor.execute(insert_str, data)
    #     conn.commit()

    #     insert_str_connect_table = "INSERT INTO `filmdata`.`movie_specialeffects` (`movie_id`, `special_effect_id`) VALUES (%s, %s)"
    #     data_connect_table = (movie_id, content_id)
    #     mycursor.execute(insert_str_connect_table, data_connect_table)
    #     conn.commit()

    #     content_id += 1

    # insert Genres table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`genres` (`genres_id`, `genres_name`) VALUES (%s, %s)"
    # genres_id = 1

    for i in range(len(genres)):
        data = (genres_id, genres[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_genres` (`movie_id`, `genres_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, genres_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        genres_id += 1


    # insert Taglines table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`taglines` (`taglines_id`, `taglines_content`) VALUES (%s, %s)"
    # taglines_id = 1

    for i in range(len(taglines)):
        data = (taglines_id, taglines[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `filmdata`.`movie_taglines` (`movie_id`, `taglines_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, taglines_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        taglines_id += 1


    # insert Did_you_know table -------------------------------------------------------
    insert_str = "INSERT INTO `filmdata`.`did_you_know` (`did_you_know_id`, `movie_id`, `name`, `content`) VALUES (%s, %s, %s, %s)"
    # did_you_know_id = 1

    for i in range(len(did_you_know)):
        data = (did_you_know_id, movie_id, did_you_know[i][0], did_you_know[i][1])
        mycursor.execute(insert_str, data)
        conn.commit()

        did_you_know_id += 1



    # insert_str = "SELECT * FROM `filmdata`.`cast`"
    # mycursor.execute(insert_str)

    # for x in mycursor:
    #     print(x)
    
mycursor.close()
conn.close()