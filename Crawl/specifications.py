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

# get link
technical_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-techspecs-header"]')
if technical_element:
    link_to_technical = technical_element[0].find_elements(By.CSS_SELECTOR, 'div > a')[0].get_attribute("href")
    
    driver.get(link_to_technical)
    time.sleep(2)

    # run time
    runtime_element = driver.find_elements(By.ID, "runtime")
    if runtime_element:
        sub_runtime_element = runtime_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_runtime_element:
            runtime.append(value.text)
        print(runtime)

    # sound_mix
    sound_mix_element = driver.find_elements(By.ID, "soundmixes")
    if sound_mix_element:
        sub_sound_mix_element = sound_mix_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_sound_mix_element:
            sound_mix.append(value.text)
        print(sound_mix)

    # color
    color_element = driver.find_elements(By.ID, "colorations")
    if color_element:
        sub_color_element = color_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_color_element:
            color.append(value.text)
        print(color)

    # aspect_ratio
    aspect_ratio_element = driver.find_elements(By.ID, "aspectratio")
    if aspect_ratio_element:
        sub_aspect_ratio_element = aspect_ratio_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_aspect_ratio_element:
            aspect_ratio.append(value.text)
        print(aspect_ratio)

    # camera
    camera_element = driver.find_elements(By.ID, "cameras")
    if camera_element:
        sub_camera_element = camera_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_camera_element:
            camera.append(value.text)
        print(camera)

    # laboratory
    laboratory_element = driver.find_elements(By.ID, "laboratory")
    if laboratory_element:
        sub_laboratory_element = laboratory_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_laboratory_element:
            laboratory.append(value.text)
        print(laboratory)

    # negative_format
    negative_format_element = driver.find_elements(By.ID, "negativeFormat")
    if negative_format_element:
        sub_negative_format_element = negative_format_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_negative_format_element:
            negative_format.append(value.text)
        print(negative_format)

    # cinematographic_process
    cinematographic_process_element = driver.find_elements(By.ID, "process")
    if cinematographic_process_element:
        sub_cinematographic_process_element = cinematographic_process_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_cinematographic_process_element:
            cinematographic_process.append(value.text)
        print(cinematographic_process)

    # printed_film_format
    printed_film_format_element = driver.find_elements(By.ID, "printedFormat")
    if printed_film_format_element:
        sub_printed_film_format_element = printed_film_format_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
        for value in sub_printed_film_format_element:
            printed_film_format.append(value.text)
        print(printed_film_format)

# # insert sound_mix table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`sound_mix` (`sound_mix_id`, `movie_id`, `sound_mix_name`) VALUES (%s, %s, %s)"
# # sound_mix_id = 1

# for i in range(len(sound_mix)):
#     data = (sound_mix_id, movie_id, sound_mix[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     sound_mix_id += 1


# # insert color table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`color` (`color_id`, `movie_id`, `color_name`) VALUES (%s, %s, %s)"
# # color_id = 1

# for i in range(len(color)):
#     data = (color_id, movie_id, color[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     color_id += 1


# # insert aspect_ratio table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`aspect_ratio` (`aspect_ratio_id`, `movie_id`, `aspect_ratio_name`) VALUES (%s, %s, %s)"
# # aspect_ratio_id = 1

# for i in range(len(aspect_ratio)):
#     data = (aspect_ratio_id, movie_id, aspect_ratio[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     aspect_ratio_id += 1

# # insert camera table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`camera` (`camera_id`, `movie_id`, `camera_name`) VALUES (%s, %s, %s)"
# # camera_id = 1

# for i in range(len(camera)):
#     data = (camera_id, movie_id, camera[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     camera_id += 1


# # insert laboratory table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`laboratory` (`laboratory_id`, `movie_id`, `laboratory_name`) VALUES (%s, %s, %s)"
# # laboratory_id = 1

# for i in range(len(laboratory)):
#     data = (laboratory_id, movie_id, laboratory[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     laboratory_id += 1
    

# # insert negative_format table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`negative_format` (`negative_format_id`, `movie_id`, `negative_format_name`) VALUES (%s, %s, %s)"
# # negative_format_id = 1

# for i in range(len(negative_format)):
#     data = (negative_format_id, movie_id, negative_format[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     negative_format_id += 1


# # insert cinematographic_process table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`cinematographic_process` (`cinematographic_process_id`, `movie_id`, `cinematographic_process_name`) VALUES (%s, %s, %s)"
# # cinematographic_process_id = 1

# for i in range(len(cinematographic_process)):
#     data = (cinematographic_process_id, movie_id, cinematographic_process[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     cinematographic_process_id += 1


# # insert printed_film_format table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`printed_film_format` (`printed_film_format_id`, `movie_id`, `printed_film_format_name`) VALUES (%s, %s, %s)"
# # printed_film_format_id = 1

# for i in range(len(printed_film_format)):
#     data = (printed_film_format_id, movie_id, printed_film_format[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     printed_film_format_id += 1


mycursor.close()
driver.close()