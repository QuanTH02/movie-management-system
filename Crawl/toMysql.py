import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")

mycursor = conn.cursor()

page_url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
driver = webdriver.Chrome()
driver.get(page_url)
#Movie information: Thông tin phim ************************
ID = 1

movie_id = ID
movie_name_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/h1/span")
movie_name = movie_name_elements[0].text
print("Tên phim: " + movie_name)

year_manufacture_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[1]/a")
year_manufacture = year_manufacture_elements[0].text
print("Sản xuất năm: " + year_manufacture)

time_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[2]/div[1]/ul/li[3]")
time = time_elements[0].text
print("Thời lượng: " + time)

insert_str = "INSERT INTO `filmdata`.`movieinformation` (`movie_id`, `movie_name`, `year_manufacture`, `time`) VALUES ( %s, %s, %s, %s)"
data = (movie_id, movie_name, year_manufacture, time)
mycursor.execute(insert_str, data)



conn.commit()

mycursor.close()
conn.close()