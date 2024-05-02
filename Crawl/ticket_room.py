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

# Ticket_room
budget = []
gross = []
opening_weekend = []
gross_worldwide = []

# budget
budget_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-boxoffice-budget"]')
if budget_element:
    sub_budget_element = budget_element[0].find_elements(By.CSS_SELECTOR, 'div')
    for value in sub_budget_element:
        budget.append(value.text)
    print(budget)

# gross
gross_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-boxoffice-grossdomestic"]')
if gross_element:
    gross_element_element = gross_element[0].find_elements(By.CSS_SELECTOR, 'div')
    for value in gross_element_element:
        gross.append(value.text)
    print(gross)


# opening_weekend
opening_weekend_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-boxoffice-openingweekenddomestic"]')
if opening_weekend_element:
    sub_opening_weekend_element = opening_weekend_element[0].find_elements(By.CSS_SELECTOR, 'div > ul > li')
    for value in sub_opening_weekend_element:
        opening_weekend.append(value.text)
    print(opening_weekend)

# gross_worldwide
gross_worldwide_element = driver.find_elements(By.CSS_SELECTOR, '*[data-testid="title-boxoffice-cumulativeworldwidegross"]')
if gross_worldwide_element:
    sub_gross_worldwide_element = gross_worldwide_element[0].find_elements(By.CSS_SELECTOR, 'div')
    for value in sub_gross_worldwide_element:
        gross_worldwide.append(value.text)
    print(gross_worldwide)


# # insert ticket_room table -------------------------------------------------------
# insert_str = "INSERT INTO `filmdata`.`ticket_room` (`ticket_room_id`, `movie_id`, `budget`, `gross`, `opening_weekend`, `gross_worldwide`) VALUES (%s, %s, %s, %s, %s, %s)"
# # ticket_room_id = 1

# for i in range(len(budget)):
#     data = (ticket_room_id, movie_id, budget[i], gross[i], opening_weekend[i] + " - " + opening_weekend[i + 1], gross_worldwide[i])
#     mycursor.execute(insert_str, data)
#     conn.commit()

#     ticket_room_id += 1

mycursor.close()
driver.close()