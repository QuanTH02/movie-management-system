from selenium import webdriver
from selenium.webdriver.common.by import By

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


#content
describe = []
describe_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p")
print(describe_elements[0].text)

element_trailer = driver.find_elements(By.CLASS_NAME, "ipc-lockup-overlay")
link_img = element_trailer[0].get_attribute("href")
link_trailer = element_trailer[1].get_attribute("href")

print("Img: " + link_img)
print("Trailer: " + link_trailer)

#All cast & crew: Tất cả ekip ***********************
#Crawl link cast & crew
link_all_cast_crew = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[4]/ul/li[3]/a[2]")
link_to_all_cast_crew = link_all_cast_crew[0].get_attribute("href")

driver.get(link_to_all_cast_crew)


#writers
writers = []
writers_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[2]/tbody/tr")
print("Writers: ")
for value in writers_elements:
    str_split = value.text
    splitted = str_split.split("...")
    if len(splitted) > 1:
        print("name: " + splitted[0] + "; describe: " + splitted[1])
        writers.append(splitted[0])

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
music_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[5]/tbody/tr")
print("Music: ")
for value in music_elements:
    str_split = value.text
    splitted = str_split.split("...")
    if len(splitted) > 1:
        print("name: " + splitted[0] + "; describe: " + splitted[1])
        music.append(splitted[0])

#cinematography
cinematography = []
cinematography_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[6]/tbody/tr")
print("Cinematography: ")
for value in cinematography_elements:
    str_split = value.text
    splitted = str_split.split("...")
    if len(splitted) > 1:
        print("name: " + splitted[0] + "; describe: " + splitted[1])
        cinematography.append(splitted[0])

#editing
editing = []
editing_elements = driver.find_elements(By.XPATH, "//*[@id=\"fullcredits_content\"]/table[7]/tbody/tr")
print("Editing: ")
for value in editing_elements:
    str_split = value.text
    splitted = str_split.split("...")
    if len(splitted) > 1:
        print("name: " + splitted[0] + "; describe: " + splitted[1])
        editing.append(splitted[0])


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




print("\n\n\n--------------------------------------------------------")
print("Movie information: Thông tin phim")
print("movie_name: " + movie_name)
print("year_manufacture: " + year_manufacture)
print("time: " + time)
print("--------------------------------------------------------\n\n")

print("--------------------------------------------------------")
print("All cast & crew: Tất cả ekip")
print("writers: ")
print(writers)
print("stars: ")
print(stars)
print("music: ")
print(music)
print("cinematography: ")
print(cinematography)
print("editing: ")
print(editing)
print("--------------------------------------------------------\n\n")

print("--------------------------------------------------------")
print("Director: Đạo diễn")
print("name: ")
print(director_name)
print("describe: ")
print(director_describe)
print("--------------------------------------------------------\n\n")

print("--------------------------------------------------------")
print("Cast: Diễn viên")
print("name: ")
print(cast_name)
print("role: ")
print(cast_role)
print("--------------------------------------------------------\n\n")

print("--------------------------------------------------------")
print("ProducedL Sản xuất")
print("name: ")
print(produced_name)
print("role: ")
print(produced_role)
print("--------------------------------------------------------\n\n")

print("--------------------------------------------------------")
print("Special Effects: Hiệu ứng đặc biệt")
print("name: ")
print(special_effect_name)
print("role: ")
print(special_effect_role)
print("--------------------------------------------------------\n\n")


driver.close()