import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException


conn = mysql.connector.connect(host="localhost", password="123456", user="root")

mycursor = conn.cursor()
page_main_url = "https://www.imdb.com/search/title/?title_type=feature&genres=action&start=101&explore=title_type,genres&ref_=adv_nxt"
driver = webdriver.Chrome()
driver.maximize_window()
driver.get(page_main_url)

time.sleep(1.5)

str_count = "SELECT COUNT(*) FROM `moviedata`.`movieinformation`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
movie_id = count + 6

str_count = "SELECT COUNT(*) FROM `moviedata`.`writers`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
writers_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`cast`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cast_id = count + 1

sstr_counttr = "SELECT COUNT(*) FROM `moviedata`.`music`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
music_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`cinematography`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cinematography_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`editing`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
editing_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`director`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
director_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`produced`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
produced_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`specialeffects`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
special_effect_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`genres`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
genres_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`taglines`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
taglines_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`did_you_know`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
did_you_know_id = count + 1

# New #################################################################
# New #################################################################
str_count = "SELECT COUNT(*) FROM `moviedata`.`country_origin`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
country_origin_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`official_site`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
official_site_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`language`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
language_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`filming_locations`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
filming_locations_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`production_companies`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
production_companies_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`sound_mix`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
sound_mix_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`color`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
color_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`aspect_ratio`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
aspect_ratio_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`camera`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
camera_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`laboratory`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
laboratory_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`negative_format`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
negative_format_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`cinematographic_process`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
cinematographic_process_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`printed_film_format`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
printed_film_format_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`ticket_room`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
ticket_room_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`awards`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
awards_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`film_review`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
film_review_id = count + 1

str_count = "SELECT COUNT(*) FROM `moviedata`.`rating`;"
mycursor.execute(str_count)
count = mycursor.fetchone()[0]
rating_id = count + 1

link = []

for i in range(0, 22):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1)
    # btn_link_element = driver.find_element(By.XPATH, "//*[@id=\"__next\"]/main/div[2]/div[2]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/div[2]/div/span/button")

    try:
        btn_link_element = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located(
                (By.XPATH, "//*[@id=\"__next\"]/main/div[2]/div[3]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/div[2]/div/span/button")
            )
        )

        driver.execute_script("arguments[0].click();", btn_link_element)
        time.sleep(1)
    except TimeoutException:
        print("Timeout")


for i in range(824, 1050):
    element_a_to_film = '//*[@id="__next"]/main/div[2]/div[3]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/ul/li[' + str(i) + "]/div/div/div/div[1]/div[2]/div[1]/a"
    
    link_film = driver.find_elements(By.XPATH, element_a_to_film)[0].get_attribute(
        "href"
    )

    link.append(link_film)

for i in link:
    movie_id += 1
    page_url = i
    driver.get(page_url)
    time.sleep(0.5)

    tag_storyline_element = driver.find_element(By.CSS_SELECTOR, "div[data-testid='storyline-header']").find_element(By.XPATH, "./..")
    driver.execute_script("arguments[0].scrollIntoView();", tag_storyline_element)

    try:
        WebDriverWait(driver,10).until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "li[data-testid='storyline-genres']")))
    except:
        print("Timeout")

    time.sleep(0.5)

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(0.5)

    # link Soecifications
    technical_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-techspecs-header"]')

    # link Award
    link_to_name_element = driver.find_elements(By.CSS_SELECTOR, '*[aria-label="See more awards and nominations"]')

    link_name_element = None
    if link_to_name_element:
        link_name_element = link_to_name_element[0].get_attribute("href")

    # link film_review
    user_review_review_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="UserReviews"]')

    # link rating
    view_user_rating_element = driver.find_elements(
        By.CSS_SELECTOR, '*[aria-label="View User Ratings"]'
    )

    link_to_technical = None
    # get link
    if technical_element:
        link_to_technical = (
            technical_element[0]
            .find_elements(By.CSS_SELECTOR, "div > a")[0]
            .get_attribute("href")
        )

    link_review_element = None
    # get link
    if user_review_review_element:
        link_review_element = (
            user_review_review_element[0]
            .find_elements(By.CSS_SELECTOR, "div > div > a")[0]
            .get_attribute("href")
        )

    link_view_user_rating_element = None
    # get link
    if view_user_rating_element:
        link_view_user_rating_element = view_user_rating_element[0].get_attribute(
            "href"
        )

    # Detail
    release_date = []
    country_origin = []
    official_site = []
    language = []
    filming_locations = []
    production_companies = []

    # Release date
    release_date_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-details-releasedate"]'
    )
    if release_date_element:
        sub_release_date_element = release_date_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_release_date_element:
            release_date.append(value.text)
        # print(release_date)

    # country origin
    country_origin_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-details-origin"]'
    )
    if country_origin_element:
        sub_country_origin_element = country_origin_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_country_origin_element:
            country_origin.append(value.text)
        # print(country_origin)

    # official_site
    official_site_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="details-officialsites"]'
    )
    if official_site_element:
        sub_official_site_element = official_site_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_official_site_element:
            link_official_site = value.find_elements(By.CSS_SELECTOR, "a")[
                0
            ].get_attribute("href")
            if link_official_site:
                official_site.append(link_official_site)
            else:
                official_site.append("")
        # print(official_site)

    # Language
    language_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-details-languages"]'
    )
    if language_element:
        sub_language_element = language_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_language_element:
            language.append(value.text)
        # print(language)

    # Film location
    filming_locations_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-details-filminglocations"]'
    )
    if filming_locations_element:
        sub_filming_locations_element = filming_locations_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_filming_locations_element:
            filming_locations.append(value.text)
        # print(filming_locations)

    # Production company
    production_companies_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-details-companies"]'
    )
    if production_companies_element:
        sub_production_companies_element = production_companies_element[
            0
        ].find_elements(By.CSS_SELECTOR, "div > ul > li")
        for value in sub_production_companies_element:
            production_companies.append(value.text)
        # print(production_companies)

    # Ticket_room
    budget = []
    gross = []
    opening_weekend = []
    gross_worldwide = []

    # budget
    budget_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-boxoffice-budget"]'
    )
    if budget_element:
        sub_budget_element = budget_element[0].find_elements(By.CSS_SELECTOR, "div")
        for value in sub_budget_element:
            budget.append(value.text)
        # print(budget)
    else:
        budget.append("")

    # gross
    gross_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-boxoffice-grossdomestic"]'
    )
    if gross_element:
        gross_element_element = gross_element[0].find_elements(By.CSS_SELECTOR, "div")
        for value in gross_element_element:
            gross.append(value.text)
        # print(gross)
    else:
        gross.append("")

    # opening_weekend
    opening_weekend_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-boxoffice-openingweekenddomestic"]'
    )
    if opening_weekend_element:
        sub_opening_weekend_element = opening_weekend_element[0].find_elements(
            By.CSS_SELECTOR, "div > ul > li"
        )
        for value in sub_opening_weekend_element:
            opening_weekend.append(value.text)
        # print(opening_weekend)
    else:
        opening_weekend.append("")
        opening_weekend.append("")

    # gross_worldwide
    gross_worldwide_element = driver.find_elements(
        By.CSS_SELECTOR, '*[data-testid="title-boxoffice-cumulativeworldwidegross"]'
    )
    if gross_worldwide_element:
        sub_gross_worldwide_element = gross_worldwide_element[0].find_elements(
            By.CSS_SELECTOR, "div"
        )
        for value in sub_gross_worldwide_element:
            gross_worldwide.append(value.text)
        # print(gross_worldwide)
    else:
        gross_worldwide.append("")

    # Genres
    genres = []

    li_all_genres_element = WebDriverWait(driver,100).until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, "li[data-testid='storyline-genres']")))
    
    if li_all_genres_element:
        ul_genres_element = li_all_genres_element.find_element(By.TAG_NAME, "ul")
        li_genres_elements = ul_genres_element.find_elements(By.TAG_NAME, "li")

        for li_genres in li_genres_elements:
            genres.append(li_genres.text)

    # print(genres)

    # Movie information: Thông tin phim ************************
    # MOVIE
    movie_name_elements = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/h1/span',
    )
    movie_name = movie_name_elements[0].text
    # print("Tên phim: " + movie_name)

    year_manufacture_elements = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[1]/a',
    )

    if year_manufacture_elements:
        year_manufacture = year_manufacture_elements[0].text
    else:
        continue
    # print("Sản xuất năm: " + year_manufacture)

    xpath_list = [
        '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]',
        '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[2]',
    ]

    for xpath in xpath_list:
        time_elements = driver.find_elements(By.XPATH, xpath)
        if time_elements:
            break

    if time_elements:
        time_movie = time_elements[0].text
        # print("Thời lượng: " + time_movie)

    # time_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]")
    # time_movie = time_elements[0].text
    # # print("Thời lượng: " + time_movie)

    element_trailer = driver.find_elements(By.CLASS_NAME, "ipc-lockup-overlay")
    link_img = element_trailer[0].get_attribute("href")
    link_trailer = element_trailer[1].get_attribute("href")

    # print("Img: " + link_img)
    # print("Trailer: " + link_trailer)

    # describe = []
    describe_elements = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p',
    )

    if describe_elements:
        describe = describe_elements[0].text
    # print(describe_elements[0].text)

    # storyline = []
    # storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")

    # if storyline_elements:
    #     storyline = storyline_elements[0].text
    # else:
    #     storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/div[1]/div/div/div")
    #     storyline = storyline_elements[0].text

    # # print(storyline_elements[0].text)

    xpath_list = [
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div',
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/div[1]/div/div/div',
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[5]/div[2]/div[1]/div/div/div',
    ]

    for xpath in xpath_list:
        storyline_elements = driver.find_elements(By.XPATH, xpath)
        if storyline_elements:
            break

    if storyline_elements:
        storyline = storyline_elements[0].text
        # print(storyline)

    taglines = []
    link_taglines = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]',
    )

    if link_taglines:
        link_to_taglines = link_taglines[0].get_attribute("href")
    else:
        link_taglines = driver.find_elements(
            By.XPATH,
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[6]/div[2]/ul[2]/li[1]/a[2]',
        )
        if link_taglines:
            link_to_taglines = link_taglines[0].get_attribute("href")

    # Did_you_know
    did_you_know = []
    did_you_know_elements = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div',
    )

    id = 1

    for value in did_you_know_elements:
        if id == 1:
            id += 1
            continue
        # time.sleep(3)
        did_you_know_comments = []
        element_a_to_comment = (
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div['
            + str(id)
            + "]/ul/li/a[2]"
        )

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
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div['
            + str(id)
            + "]/ul/li/a[1]",
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[8]/div['
            + str(id)
            + "]/ul/li/a[1]",
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[6]/div['
            + str(id)
            + "]/ul/li/a[1]",
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
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[7]/div['
            + str(id)
            + "]/ul/li/div",
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[8]/div['
            + str(id)
            + "]/ul/li/div",
            '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[6]/div['
            + str(id)
            + "]/ul/li/div",
        ]

        for xpath in xpath_list:
            content_comment_dyk = driver.find_elements(By.XPATH, xpath)
            if content_comment_dyk:
                break

        if title_dyk:
            did_you_know_comments.append(title_dyk[0].text)
            did_you_know_comments.append(content_comment_dyk[0].text)

            # print(title_dyk[0].text, ": ", content_comment_dyk[0].text)

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
        #             # print(int(id_comment/2), ":", comment_elements[0].text)

        #         id_comment += 1

        #     did_you_know += [did_you_know_comments]
        #     # print(did_you_know_comments)

        #     # Quay lại trang chính của phim
        #     # driver.get(page_url)
        #     driver.back()
        #     driver.execute_script("window.scrollTo(0, 5000);")
        #     time.sleep(5)
        id += 1
    ################################################
    # # print("Did you know\n")
    # for i in did_you_know:
    #     # print("Did you know: ", i)

    # insert_str = "INSERT INTO `moviedata`.`movieinformation` (`movie_id`, `movie_name`, `year_manufacture`, `time`, `link_img`, `link_trailer`) VALUES ( %s, %s, %s, %s, %s, %s)"
    # data = (movie_id, movie_name, year_manufacture, time_movie, link_img, link_trailer)
    # mycursor.execute(insert_str, data)

    # conn.commit()

    # All cast & crew: Tất cả ekip ***********************
    # Crawl link cast & crew
    # link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]")
    # if link_all_cast_crew:
    #     link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")
    # else:
    #     link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[3]/ul/li[3]/a[2]")
    #     link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")

    xpath_list = [
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]',
        '//*[@id="__next"]/main/div/section[1]/div/section/div/div[1]/section[3]/ul/li[3]/a[2]',
    ]

    link_all_cast_crew = None
    for xpath in xpath_list:
        link_all_cast_crew = driver.find_elements(By.XPATH, xpath)
        if link_all_cast_crew:
            break

    if link_all_cast_crew:
        link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")
        driver.get(link_to_all_cast_crew)

    # writers
    writers = []
    writers_role = []
    writers_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[2]/tbody/tr'
    )
    # print("Writers: ")
    for value in writers_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            writers.append(splitted[0])
            writers_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            writers.append(splitted[0])
            writers_role.append("")

    # cast and stars
    stars = []
    cast_name = []
    cast_role = []
    cast_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[3]/tbody/tr'
    )
    # print("Cast: ")
    for value in cast_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            cast_name.append(splitted[0])
            cast_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            cast_name.append(splitted[0])
            cast_role.append("")
        if (
            value == cast_elements[0]
            or value == cast_elements[1]
            or value == cast_elements[2]
            or value == cast_elements[3]
        ) and len(splitted) > 1:
            stars.append(splitted[0])

    # music
    music = []
    music_role = []
    music_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[5]/tbody/tr'
    )
    # print("Music: ")
    for value in music_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            music.append(splitted[0])
            music_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            music.append(splitted[0])
            music_role.append("")

    # cinematography
    cinematography = []
    cinematography_role = []
    cinematography_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[6]/tbody/tr'
    )
    # print("Cinematography: ")
    for value in cinematography_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            cinematography.append(splitted[0])
            cinematography_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            cinematography.append(splitted[0])
            cinematography_role.append("")

    # editing
    editing = []
    editing_role = []
    editing_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[7]/tbody/tr'
    )
    # print("Editing: ")
    for value in editing_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            editing.append(splitted[0])
            editing_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            editing.append(splitted[0])
            editing_role.append("")

    # director
    director_name = []
    director_describe = []
    director_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[1]/tbody/tr'
    )
    # print("Director: ")
    for value in director_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            director_name.append(splitted[0])
            director_describe.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            director_name.append(splitted[0])
            director_describe.append("")

    # produced
    produced_name = []
    produced_role = []
    produced_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[4]/tbody/tr'
    )
    # print("Produced: ")
    for value in produced_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            produced_name.append(splitted[0])
            produced_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            produced_name.append(splitted[0])
            produced_role.append("")

    # special effects
    special_effect_name = []
    special_effect_role = []
    special_effect_elements = driver.find_elements(
        By.XPATH, '//*[@id="fullcredits_content"]/table[18]/tbody/tr'
    )
    # print("Special Effects: ")
    for value in special_effect_elements:
        str_split = value.text
        splitted = str_split.split("...")
        if len(splitted) > 1:
            # print("name: " + splitted[0] + "; describe: " + splitted[1])
            special_effect_name.append(splitted[0])
            special_effect_role.append(splitted[1])
        if len(splitted) == 1:
            # print("name: " + splitted[0])
            special_effect_name.append(splitted[0])
            special_effect_role.append("")

    # Content
    # driver.back()

    # describe = []
    # describe_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p")
    # describe.append(describe_elements[0].text)
    # # print(describe_elements[0].text)

    # storyline = []
    # storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")
    # storyline.append(storyline_elements[0].text)
    # # print(storyline_elements[0].text)

    # taglines = []
    # link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]")
    # link_to_taglines = link_taglines[0].get_attribute("href")

    if link_taglines:
        driver.get(link_to_taglines)

    try:
        WebDriverWait(driver,3).until(EC.presence_of_element_located(
        (By.XPATH, '//*[@id="__next"]/main/div/section/div/section/div/div[1]/section[1]/div/ul/li')))
    except:
        print("Timeout")

    taglines_elements = driver.find_elements(
        By.XPATH,
        '//*[@id="__next"]/main/div/section/div/section/div/div[1]/section[1]/div/ul/li',
    )

    for value in taglines_elements:
        taglines.append(value.text)
        # print(value.text)

    # # print("Describe: ")
    # for value in describe:
    #     # print(value)

    # # print("Storyline: ")
    # for value in storyline:
    #     # print(value)

    # # print("Taglines: ")
    # for value in describe:
    #     # print(taglines)

    # Specifications
    runtime = []
    sound_mix = []
    color = []
    aspect_ratio = []
    camera = []
    laboratory = []
    negative_format = []
    cinematographic_process = []
    printed_film_format = []

    if link_to_technical:
        driver.get(link_to_technical)

        try:
            WebDriverWait(driver,2).until(EC.presence_of_element_located(
            (By.ID, "runtime")))
        except:
            print("Timeout")

        # run time
        runtime_element = driver.find_elements(By.ID, "runtime")
        if runtime_element:
            sub_runtime_element = runtime_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_runtime_element:
                runtime.append(value.text)
            # print(runtime)

        # sound_mix
        sound_mix_element = driver.find_elements(By.ID, "soundmixes")
        if sound_mix_element:
            sub_sound_mix_element = sound_mix_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_sound_mix_element:
                sound_mix.append(value.text)
            # print(sound_mix)

        # color
        color_element = driver.find_elements(By.ID, "colorations")
        if color_element:
            sub_color_element = color_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_color_element:
                color.append(value.text)
            # print(color)

        # aspect_ratio
        aspect_ratio_element = driver.find_elements(By.ID, "aspectratio")
        if aspect_ratio_element:
            sub_aspect_ratio_element = aspect_ratio_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_aspect_ratio_element:
                aspect_ratio.append(value.text)
            # print(aspect_ratio)

        # camera
        camera_element = driver.find_elements(By.ID, "cameras")
        if camera_element:
            sub_camera_element = camera_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_camera_element:
                camera.append(value.text)
            # print(camera)

        # laboratory
        laboratory_element = driver.find_elements(By.ID, "laboratory")
        if laboratory_element:
            sub_laboratory_element = laboratory_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_laboratory_element:
                laboratory.append(value.text)
            # print(laboratory)

        # negative_format
        negative_format_element = driver.find_elements(By.ID, "negativeFormat")
        if negative_format_element:
            sub_negative_format_element = negative_format_element[0].find_elements(
                By.CSS_SELECTOR, "div > ul > li"
            )
            for value in sub_negative_format_element:
                negative_format.append(value.text)
            # print(negative_format)

        # cinematographic_process
        cinematographic_process_element = driver.find_elements(By.ID, "process")
        if cinematographic_process_element:
            sub_cinematographic_process_element = cinematographic_process_element[
                0
            ].find_elements(By.CSS_SELECTOR, "div > ul > li")
            for value in sub_cinematographic_process_element:
                cinematographic_process.append(value.text)
            # print(cinematographic_process)

        # printed_film_format
        printed_film_format_element = driver.find_elements(By.ID, "printedFormat")
        if printed_film_format_element:
            sub_printed_film_format_element = printed_film_format_element[
                0
            ].find_elements(By.CSS_SELECTOR, "div > ul > li")
            for value in sub_printed_film_format_element:
                printed_film_format.append(value.text)
            # print(printed_film_format)

    # Awards
    awards_name = []

    # get link
    if link_name_element:
        driver.get(link_name_element)

        try:
            WebDriverWait(driver,2).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '*[class="ipc-title-link-wrapper"]')))
        except:
            print("Timeout")

        # Get Name
        name_element = driver.find_elements(
            By.CSS_SELECTOR, '*[class="ipc-title-link-wrapper"]'
        )

        if name_element:
            for value in name_element:
                # sub_name_element = i.find_elements(By.XPATH, 'div[1]')
                # for value in sub_name_element:
                if value.text != "User lists" and value.text != "User polls":
                    awards_name.append(value.text)
            # print(awards_name)
    else:
        awards_name.append("")

    # Film review
    star_review = []
    title_review = []
    name_review = []
    date_review = []
    content_review = []

    # get link
    if link_review_element:
        driver.get(link_review_element)
        # Load review more
        load_more_element = driver.find_elements(
            By.CSS_SELECTOR, '*[class="ipl-load-more__button"]'
        )
        if load_more_element:
            load_more_element[0].click()

        try:
            WebDriverWait(driver,2).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '*[class="lister-item mode-detail imdb-user-review  collapsable"]')))
        except:
            print("Timeout")

        # Get all review
        review_element = driver.find_elements(
            By.CSS_SELECTOR,
            '*[class="lister-item mode-detail imdb-user-review  collapsable"]',
        )

        if review_element:
            for value in review_element:
                # star
                star_review_element = value.find_elements(
                    By.CSS_SELECTOR, "div > div > div > span"
                )
                star_review.append(star_review_element[0].text)

                # title
                title_review_element = value.find_elements(
                    By.CSS_SELECTOR, "div > div > div > a"
                )
                title_review.append(title_review_element[0].text)

                # name
                name_review_element = value.find_elements(
                    By.CSS_SELECTOR, "div > div > div > span"
                )
                name_review.append(name_review_element[1].text)

                # date
                date_review.append(name_review_element[2].text)

                # content
                content_review_element = value.find_elements(
                    By.CSS_SELECTOR, '*[class="content"]'
                )
                content_review.append(content_review_element[0].text)

    # print("Star: ", star_review)
    # print("Title: ", title_review)
    # print("Name: ", name_review)
    # print("Date: ", date_review)
    # print("Content: ", content_review)

    # IMDb_rating
    rating = None
    total_vote = None
    number_of_stars = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
    percent_and_number = []
    percent_people_vote = []
    number_people_vote = []

    # get link
    if link_view_user_rating_element:
        driver.get(link_view_user_rating_element)
        # time.sleep(1)

        div_data_id_rating_element = driver.find_element(By.CSS_SELECTOR, "div[data-testid='rating-button__aggregate-rating']")
        
        div2_on_div_data_element = div_data_id_rating_element.find_elements(By.CSS_SELECTOR, "div")

        wrapper_element = div2_on_div_data_element[1].find_elements(
            By.CSS_SELECTOR, "div"
        )[1]

        # Rating
        if wrapper_element:
            rating_element = wrapper_element.find_elements(
                By.CSS_SELECTOR, "div"
            )
            rating = rating_element[0].find_elements(By.CSS_SELECTOR, "span")[0].text
            rating += "/10"

            # Total vote
            total_vote_element = wrapper_element.find_elements(
                By.CSS_SELECTOR, "div"
            )
            total_vote = total_vote_element[1].text
        else:
            rating = ""
            total_vote = ""

        # percent and number
        for i in range(1, 11):
            element_command = "chart-bar-1-labels-" + str(i - 1)
            command_element = driver.find_elements(By.ID, element_command)
            if command_element:
                percent_and_number.append(command_element[0].text)

                parts = command_element[0].text.split()

                # percent_people_vote
                percent_people_vote.append(parts[0])

                # number_people_vote
                number_people_vote.append(parts[1].strip("()"))
            else:
                percent_people_vote.append("")
                number_people_vote.append("")
    # print(rating)
    # print(total_vote)
    # print(number_of_stars)
    # print(percent_people_vote)
    # print(number_people_vote)

    insert_str = "INSERT INTO `moviedata`.`movieinformation` (`movie_id`, `movie_name`, `year_manufacture`, `release_date`, `time`, `link_img`, `link_trailer`, `describe_movie`, `storyline`, `rating`, `total_vote`) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    data = (
        movie_id,
        movie_name,
        year_manufacture,
        release_date[0],
        time_movie,
        link_img,
        link_trailer,
        describe,
        storyline,
        rating,
        total_vote,
    )
    mycursor.execute(insert_str, data)

    conn.commit()

    #########################################################################################################################################################################
    #########################################################################################################################################################################
    #########################################################################################################################################################################
    # insert Writers table -------------------------------------------------------
    # insert_str = "INSERT INTO `moviedata`.`allcastcrew` (`movie_id`, `writers`, `stars`, `music`, `cinematography`, `editing`) VALUES ( %s, %s, %s, %s, %s, %s)"
    insert_str = "INSERT INTO `moviedata`.`writers` (`writers_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # writers_id = 1

    for i in range(len(writers)):
        data = (writers_id, writers[i], writers_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_writers` (`movie_id`, `writers_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, writers_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        writers_id += 1

    # insert Cast table -------------------------------------------------------
    insert_str = (
        "INSERT INTO `moviedata`.`cast` (`cast_id`, `name`, `role`) VALUES (%s, %s, %s)"
    )
    # cast_id = 1

    for i in range(len(cast_name)):
        data = (cast_id, cast_name[i], cast_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_cast` (`movie_id`, `cast_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, cast_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        cast_id += 1

    # insert Music table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`music` (`music_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # music_id = 1

    for i in range(len(music)):
        data = (music_id, music[i], music_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_music` (`movie_id`, `music_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, music_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        music_id += 1

    # insert Cinematography table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`cinematography` (`cinematography_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # cinematography_id = 1

    for i in range(len(cinematography)):
        data = (cinematography_id, cinematography[i], cinematography_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_cinematography` (`movie_id`, `cinematography_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, cinematography_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        cinematography_id += 1

    # insert Editing table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`editing` (`editing_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # editing_id = 1

    for i in range(len(editing)):
        data = (editing_id, editing[i], editing_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_editing` (`movie_id`, `editing_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, editing_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        editing_id += 1

    # insert Director table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`director` (`director_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # director_id = 1

    for i in range(len(director_name)):
        data = (director_id, director_name[i], director_describe[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_director` (`movie_id`, `director_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, director_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        director_id += 1

    # insert Produced table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`produced` (`produced_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # produced_id = 1

    for i in range(len(produced_name)):
        data = (produced_id, produced_name[i], produced_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_produced` (`movie_id`, `produced_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, produced_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        produced_id += 1

    # insert Special Effects table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`specialeffects` (`special_effect_id`, `name`, `role`) VALUES (%s, %s, %s)"
    # special_effect_id = 1

    for i in range(len(special_effect_name)):
        data = (special_effect_id, special_effect_name[i], special_effect_role[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_specialeffects` (`movie_id`, `special_effect_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, special_effect_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        special_effect_id += 1

    # # insert Content table -------------------------------------------------------
    # insert_str = "INSERT INTO `moviedata`.`content` (`content_id`, `describe`, `storyline`, `taglines`) VALUES (%s, %s, %s, %s)"
    # content_id = 1

    # for i in range(len(special_effect_name)):
    #     data = (content_id, special_effect_name[i] , special_effect_role[i])
    #     mycursor.execute(insert_str, data)
    #     conn.commit()

    #     insert_str_connect_table = "INSERT INTO `moviedata`.`movie_specialeffects` (`movie_id`, `special_effect_id`) VALUES (%s, %s)"
    #     data_connect_table = (movie_id, content_id)
    #     mycursor.execute(insert_str_connect_table, data_connect_table)
    #     conn.commit()

    #     content_id += 1

    # insert Genres table -------------------------------------------------------
    insert_str = (
        "INSERT INTO `moviedata`.`genres` (`genres_id`, `genres_name`) VALUES (%s, %s)"
    )
    # genres_id = 1

    for i in range(len(genres)):
        data = (genres_id, genres[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_genres` (`movie_id`, `genres_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, genres_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        genres_id += 1

    # insert Taglines table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`taglines` (`taglines_id`, `taglines_content`) VALUES (%s, %s)"
    # taglines_id = 1

    for i in range(len(taglines)):
        data = (taglines_id, taglines[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        insert_str_connect_table = "INSERT INTO `moviedata`.`movie_taglines` (`movie_id`, `taglines_id`) VALUES (%s, %s)"
        data_connect_table = (movie_id, taglines_id)
        mycursor.execute(insert_str_connect_table, data_connect_table)
        conn.commit()

        taglines_id += 1

    # insert Did_you_know table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`did_you_know` (`did_you_know_id`, `movie_id`, `name`, `content`) VALUES (%s, %s, %s, %s)"
    # did_you_know_id = 1

    for i in range(len(did_you_know)):
        data = (did_you_know_id, movie_id, did_you_know[i][0], did_you_know[i][1])
        mycursor.execute(insert_str, data)
        conn.commit()

        did_you_know_id += 1

    # insert_str = "SELECT * FROM `moviedata`.`cast`"
    # mycursor.execute(insert_str)

    # for x in mycursor:
    #     # print(x)

    # insert country_origin table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`country_origin` (`country_origin_id`, `movie_id`, `country_origin_name`) VALUES (%s, %s, %s)"
    # country_origin_id = 1

    for i in range(len(country_origin)):
        data = (country_origin_id, movie_id, country_origin[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        country_origin_id += 1

    # insert official_site table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`official_site` (`official_site_id`, `movie_id`, `official_site_name`) VALUES (%s, %s, %s)"
    # official_site_id = 1

    for i in range(len(official_site)):
        data = (official_site_id, movie_id, official_site[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        official_site_id += 1

    # insert language table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`language` (`language_id`, `movie_id`, `language_name`) VALUES (%s, %s, %s)"
    # language_id = 1

    for i in range(len(language)):
        data = (language_id, movie_id, language[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        language_id += 1

    # insert filming_locations table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`filming_locations` (`filming_locations_id`, `movie_id`, `filming_locations_name`) VALUES (%s, %s, %s)"
    # filming_locations_id = 1

    for i in range(len(filming_locations)):
        data = (filming_locations_id, movie_id, filming_locations[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        filming_locations_id += 1

    # insert production_companies table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`production_companies` (`production_companies_id`, `movie_id`, `production_companies_name`) VALUES (%s, %s, %s)"
    # production_companies_id = 1

    for i in range(len(production_companies)):
        data = (production_companies_id, movie_id, production_companies[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        production_companies_id += 1

    # insert sound_mix table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`sound_mix` (`sound_mix_id`, `movie_id`, `sound_mix_name`) VALUES (%s, %s, %s)"
    # sound_mix_id = 1

    for i in range(len(sound_mix)):
        data = (sound_mix_id, movie_id, sound_mix[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        sound_mix_id += 1

    # insert color table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`color` (`color_id`, `movie_id`, `color_name`) VALUES (%s, %s, %s)"
    # color_id = 1

    for i in range(len(color)):
        data = (color_id, movie_id, color[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        color_id += 1

    # insert aspect_ratio table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`aspect_ratio` (`aspect_ratio_id`, `movie_id`, `aspect_ratio_name`) VALUES (%s, %s, %s)"
    # aspect_ratio_id = 1

    for i in range(len(aspect_ratio)):
        data = (aspect_ratio_id, movie_id, aspect_ratio[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        aspect_ratio_id += 1

    # insert camera table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`camera` (`camera_id`, `movie_id`, `camera_name`) VALUES (%s, %s, %s)"
    # camera_id = 1

    for i in range(len(camera)):
        data = (camera_id, movie_id, camera[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        camera_id += 1

    # insert laboratory table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`laboratory` (`laboratory_id`, `movie_id`, `laboratory_name`) VALUES (%s, %s, %s)"
    # laboratory_id = 1

    for i in range(len(laboratory)):
        data = (laboratory_id, movie_id, laboratory[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        laboratory_id += 1

    # insert negative_format table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`negative_format` (`negative_format_id`, `movie_id`, `negative_format_name`) VALUES (%s, %s, %s)"
    # negative_format_id = 1

    for i in range(len(negative_format)):
        data = (negative_format_id, movie_id, negative_format[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        negative_format_id += 1

    # insert cinematographic_process table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`cinematographic_process` (`cinematographic_process_id`, `movie_id`, `cinematographic_process_name`) VALUES (%s, %s, %s)"
    # cinematographic_process_id = 1

    for i in range(len(cinematographic_process)):
        data = (cinematographic_process_id, movie_id, cinematographic_process[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        cinematographic_process_id += 1

    # insert printed_film_format table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`printed_film_format` (`printed_film_format_id`, `movie_id`, `printed_film_format_name`) VALUES (%s, %s, %s)"
    # printed_film_format_id = 1

    for i in range(len(printed_film_format)):
        data = (printed_film_format_id, movie_id, printed_film_format[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        printed_film_format_id += 1

    # insert ticket_room table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`ticket_room` (`ticket_room_id`, `movie_id`, `budget`, `gross`, `opening_weekend`, `gross_worldwide`) VALUES (%s, %s, %s, %s, %s, %s)"
    # ticket_room_id = 1

    for i in range(len(budget)):
        data = (
            ticket_room_id,
            movie_id,
            budget[i],
            gross[i],
            opening_weekend[i] + " - " + opening_weekend[i + 1],
            gross_worldwide[i],
        )
        mycursor.execute(insert_str, data)
        conn.commit()

        ticket_room_id += 1

    # insert Awards table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`awards` (`awards_id`, `movie_id`, `awards_name`) VALUES (%s, %s, %s)"
    # awards_id = 1

    for i in range(len(awards_name)):
        data = (awards_id, movie_id, awards_name[i])
        mycursor.execute(insert_str, data)
        conn.commit()

        awards_id += 1

    # insert film_review table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`film_review` (`film_review_id`, `movie_id`, `star_review`, `title_review`, `name_review`, `date_review`, `content_review`) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    # film_review_id = 1

    for i in range(len(star_review)):
        data = (
            film_review_id,
            movie_id,
            star_review[i],
            title_review[i],
            name_review[i],
            date_review[i],
            content_review[i],
        )
        mycursor.execute(insert_str, data)
        conn.commit()

        film_review_id += 1

    # insert rating table -------------------------------------------------------
    insert_str = "INSERT INTO `moviedata`.`rating` (`rating_id`, `movie_id`, `number_of_stars`, `percent_people_vote`, `number_people_vote`) VALUES (%s, %s, %s, %s, %s)"
    # rating_id = 1

    for i in range(len(percent_people_vote)):
        data = (
            rating_id,
            movie_id,
            number_of_stars[i],
            percent_people_vote[i],
            number_people_vote[i],
        )
        mycursor.execute(insert_str, data)
        conn.commit()

        rating_id += 1

mycursor.close()
conn.close()
