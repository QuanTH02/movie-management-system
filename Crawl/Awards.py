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

# Awards
awards_name = []

# get link
link_name_element = driver.find_elements(By.CSS_SELECTOR, '*[aria-label="See more awards and nominations"]')[0].get_attribute("href")
if link_name_element:
    driver.get(link_name_element)
    time.sleep(2)

    # Get Name
    name_element = driver.find_elements(By.CSS_SELECTOR, '*[class="ipc-title-link-wrapper"]')

    if name_element:
        for value in name_element:
            # sub_name_element = i.find_elements(By.XPATH, 'div[1]')
            # for value in sub_name_element:
            if (value.text != "User lists" and value.text != "User polls"):
                awards_name.append(value.text)
        print(awards_name)

# # insert Awards table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`awards` (`awards_id`, `movie_id`, `awards_name`) VALUES (%s, %s, %s)"
# # awards_id = 1

# for i in range(len(awards_name)):
#     data = (awards_id, movie_id, awards_name[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     awards_id += 1

mycursor.close()
driver.close()