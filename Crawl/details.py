import mysql.connector
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

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

# Detail
release_date = []
country_origin = []
official_site = []
language = []
filming_locations = []
production_companies = []

# Release date
release_date_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-details-releasedate"]')
if release_date_element:
    sub_release_date_element = release_date_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_release_date_element:
        release_date.append(value.text)
    print(release_date)

# country origin
country_origin_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-details-origin"]')
if country_origin_element:
    sub_country_origin_element = country_origin_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_country_origin_element:
        country_origin.append(value.text)
    print(country_origin)

# official_site
official_site_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="details-officialsites"]')
if official_site_element:
    sub_official_site_element = official_site_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_official_site_element:
        link_official_site = value.find_elements(By.CSS_SELECTOR, 'a')[0].get_attribute('href')
        if link_official_site:
            official_site.append(link_official_site)
        else:
            official_site.append("")

    print(official_site)

# Language
language_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-details-languages"]')
if language_element:
    sub_language_element = language_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_language_element:
        language.append(value.text)
    print(language)

# Film location
filming_locations_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-details-filminglocations"]')
if filming_locations_element:
    sub_filming_locations_element = filming_locations_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_filming_locations_element:
        filming_locations.append(value.text)
    print(filming_locations)

# Production company
production_companies_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-details-companies"]')
if production_companies_element:
    sub_production_companies_element = production_companies_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_production_companies_element:
        production_companies.append(value.text)
    print(production_companies)


# # insert country_origin table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`country_origin` (`country_origin_id`, `movie_id`, `country_origin_name`) VALUES (%s, %s, %s)"
# # country_origin_id = 1

# for i in range(len(country_origin)):
#     data = (country_origin_id, movie_id, country_origin[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     country_origin_id += 1

# # insert official_site table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`official_site` (`official_site_id`, `movie_id`, `official_site_name`) VALUES (%s, %s, %s)"
# official_site_id = 1

# for i in range(len(official_site)):
#     data = (official_site_id, movie_id, official_site[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     official_site_id += 1

# # insert language table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`language` (`language_id`, `movie_id`, `language_name`) VALUES (%s, %s, %s)"
# language_id = 1

# for i in range(len(language)):
#     data = (language_id, movie_id, language[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     language_id += 1

# # insert filming_locations table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`filming_locations` (`filming_locations_id`, `movie_id`, `filming_locations_name`) VALUES (%s, %s, %s)"
# filming_locations_id = 1

# for i in range(len(filming_locations)):
#     data = (filming_locations_id, movie_id, filming_locations[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     filming_locations_id += 1

# # insert production_companies table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`production_companies` (`production_companies_id`, `movie_id`, `production_companies_name`) VALUES (%s, %s, %s)"
# production_companies_id = 1

# for i in range(len(production_companies)):
#     data = (production_companies_id, movie_id, production_companies[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     production_companies_id += 1

mycursor.close()
driver.close()