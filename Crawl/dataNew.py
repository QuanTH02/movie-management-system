from selenium import webdriver
from selenium.webdriver.common.by import By
import time

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


driver.close()