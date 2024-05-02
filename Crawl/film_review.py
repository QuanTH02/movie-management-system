from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import mysql.connector
conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

page_url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
driver = webdriver.Chrome()
driver.get(page_url)

driver.execute_script("window.scrollTo(0, 5000);")

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
time.sleep(2)

# Film review
star_review = []
title_review = []
name_review = []
date_review = []
content_review = []

# get link
user_review_review_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="UserReviews"]')

if user_review_review_element:
    link_review_element = user_review_review_element[0].find_elements(By.CSS_SELECTOR, 'div > div > a')[0].get_attribute("href")
    if link_review_element:
        driver.get(link_review_element)
        time.sleep(1)

        # Load review more
        load_more_element = driver.find_elements(By.CSS_SELECTOR, '*[class="ipl-load-more__button"]')
        if load_more_element:
            load_more_element[0].click()
        time.sleep(4)

        # Get all review
        review_element = driver.find_elements(By.CSS_SELECTOR, '*[class="lister-item mode-detail imdb-user-review  collapsable"]')

        if review_element:
            for value in review_element:
                # star
                star_review_element = value.find_elements(By.CSS_SELECTOR, 'div > div > div > span')
                star_review.append(star_review_element[0].text)

                # title
                title_review_element = value.find_elements(By.CSS_SELECTOR, 'div > div > div > a')
                title_review.append(title_review_element[0].text)

                # name
                name_review_element = value.find_elements(By.CSS_SELECTOR, 'div > div > div > span')
                name_review.append(name_review_element[1].text)

                # date
                date_review.append(name_review_element[2].text)

                # content
                content_review_element = value.find_elements(By.CSS_SELECTOR, '*[class="content"]')
                content_review.append(content_review_element[0].text)

print("Star: ", star_review)
print("Title: ", title_review)
print("Name: ", name_review)
print("Date: ", date_review)
print("Content: ", content_review)


# # insert film_review table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`film_review` (`film_review_id`, `movie_id`, `star_review`, `title_review`, `name_review`, `date_review`, `content_review`) VALUES (%s, %s, %s, %s, %s, %s, %s)"
# # film_review_id = 1

# for i in range(len(star_review)):
#     data = (film_review_id, movie_id, star_review[i], title_review[i], name_review[i], date_review[i], content_review[i] )
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     film_review_id += 1

mycursor.close()
driver.close()