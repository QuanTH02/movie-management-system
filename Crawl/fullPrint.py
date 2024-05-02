import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()
# page_main_url = "https://www.imdb.com/search/title/?genres=action&start=1&explore=title_type,genres&ref_=adv_nxt&title_type=feature"
driver = webdriver.Chrome()
# driver.get(page_main_url)

time.sleep(2)

i = 1
link = []

# for i in range(1, 51):
#     element_a_to_film = "//*[@id=\"main\"]/div/div[3]/div/div[" + str(i) + "]/div[3]/h3/a"
#     link_film = driver.find_elements(By.XPATH, element_a_to_film)[0].get_attribute("href")
#     link.append(link_film)

for i in range(1, 2):
    page_url = "https://www.imdb.com/title/tt11858890/?ref_=adv_li_tt"
    driver.get(page_url)

    driver.execute_script("window.scrollTo(0, 3000);")
    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, 3500);")
    time.sleep(20)

    driver.execute_script("window.scrollTo(0, 4000);")
    time.sleep(0.5)

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
    movie_id = 1
    movie_name_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/h1/span")
    movie_name = movie_name_elements[0].text
    print("Tên phim: " + movie_name)

    year_manufacture_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[1]/a")
    year_manufacture = year_manufacture_elements[0].text
    print("Sản xuất năm: " + year_manufacture)

    time_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]")
    time_movie = time_elements[0].text
    print("Thời lượng: " + time_movie)

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
    storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")
    storyline = storyline_elements[0].text
    print(storyline_elements[0].text)

    taglines = []
    link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]")
    link_to_taglines = link_taglines[0].get_attribute("href")


    # Did_you_know
    did_you_know = []
    did_you_know_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div")

    id = 1

    for value in did_you_know_elements:
        if id == 1:
            id += 1
            continue
        # time.sleep(3)
        did_you_know_comments = []
        element_a_to_comment = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[2]"

        title_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[1]"
        title_dyk = driver.find_elements(By.XPATH, title_comment_element)

        content_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/div"
        content_comment_dyk = driver.find_elements(By.XPATH, content_comment_element)

        # if title_dyk:
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
    link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]")
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
