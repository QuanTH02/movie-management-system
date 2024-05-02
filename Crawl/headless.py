from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# Tạo cấu hình cho chế độ headless của Chrome
chrome_options = Options()
chrome_options.add_argument("--headless")

# Khởi tạo trình duyệt Chrome trong chế độ headless
driver = webdriver.Chrome(options=chrome_options)
page_url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
driver.get(page_url)
time.sleep(5)

# Genres
did_you_know = []

did_you_know_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div")
id = 1

for value in did_you_know_elements:
    if id == 1:
        id += 1
        continue
    did_you_know_comments = []
    element_a_to_comment = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[2]"
    did_you_know.append(value.text)
    print(value.text)
    id += 1

    did_you_know_link_comments = driver.find_elements(By.XPATH, element_a_to_comment)
    link_to_comments = did_you_know_link_comments[0].get_attribute("href")


    # Vào comment của từng mục
    driver.get(link_to_comments)
    time.sleep(7)

    # Lấy tất cả các thẻ comment
    click_button_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div[11]/div/span[2]/button")
    click_button_elements[0].click()

    time.sleep(5)

    did_you_know_comment_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div")
    id_comment = 1

    for value_comment in did_you_know_comment_elements:
        if id_comment % 2 == 0:
            content_element = "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div["+ str(id_comment) +"]/div/div[2]"
            comment_elements = driver.find_elements(By.XPATH, content_element)
            did_you_know_comments.append(comment_elements[0].text)
            print(int(id_comment/2), ": ", comment_elements[0].text)

        id_comment += 1

    did_you_know += [did_you_know_comments]
    print(did_you_know_comments)
    driver.get(page_url)
    time.sleep(5)

print(did_you_know)

driver.quit()