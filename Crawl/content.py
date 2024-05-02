from selenium import webdriver
from selenium.webdriver.common.by import By
import time

page_url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
driver = webdriver.Chrome()
driver.get(page_url)

driver.execute_script("window.scrollTo(0, 5000);")

time.sleep(5)

#content
describe = []
describe_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/section/div[3]/section/section/div[3]/div[2]/div[1]/section/p")
describe.append(describe_elements[0].text)
print(describe_elements[0].text)

# storyline
storyline = []
storyline_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/div[1]/div/div/div")
storyline.append(storyline_elements[0].text)
print(storyline_elements[0].text)

#taglines
taglines = []
link_taglines = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[7]/div[2]/ul[2]/li[1]/a[2]")
link_to_taglines = link_taglines[0].get_attribute("href")

driver.get(link_to_taglines)

time.sleep(5)

taglines_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div/ul/li")
for value in taglines_elements:
    taglines.append(value.text)
    print(value.text)

print("Describe: ")
for value in describe:
    print(value)

print("Storyline: ")
for value in storyline:
    print(value)

print("Taglines: ")
for value in describe:
    print(taglines)

driver.close()