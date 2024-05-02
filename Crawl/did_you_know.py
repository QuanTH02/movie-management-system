from selenium import webdriver
from selenium.webdriver.common.by import By
import time

page_url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
driver = webdriver.Chrome()
driver.get(page_url)

driver.execute_script("window.scrollTo(0, 4500);")

time.sleep(3)

# Did_you_know
did_you_know = []
did_you_know_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div")

id = 1

for value in did_you_know_elements:
    if id == 1:
        id += 1
        continue
    # time.sleep(3)
    did_you_know_comments = []
    element_a_to_comment = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[2]"

    title_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/a[1]"
    title = driver.find_elements(By.XPATH, title_comment_element)

    content_comment_element = "//*[@id=\"__next\"]/main/div/section[1]/div/section/div/div[1]/section[8]/div[" + str(id) + "]/ul/li/div"
    content_comment = driver.find_elements(By.XPATH, content_comment_element)

    # if title:
    did_you_know_comments.append(title[0].text)
    did_you_know_comments.append(content_comment[0].text)

    print(title[0].text, ": ", content_comment[0].text)

    did_you_know += [did_you_know_comments]
        # id += 1
    #     ################################################
    #     did_you_know_link_comments = driver.find_elements(By.XPATH, element_a_to_comment)
    #     link_to_comments = did_you_know_link_comments[0].get_attribute("href")


    #     # Vào comment của từng mục
    #     driver.get(link_to_comments)
    #     time.sleep(5)

    #     # Lấy tất cả các thẻ comment

    #     # Tắt thông báo
    #     click_button_exit_elements = driver.find_elements(By.XPATH, "/html/body/div[4]/div[2]/div/div[1]/button")
        
    #     if(click_button_exit_elements):
    #         click_button_exit_elements[0].click()
    #         time.sleep(2)

    #     # # Bấm vào mục mở rộng để có nhiều comment hơn
    #     # click_button_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div[11]/div/span[2]/button")
    #     # click_button_elements[0].click()

    #     # time.sleep(3)

    #     did_you_know_comment_elements = driver.find_elements(By.XPATH, "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div")
    #     id_comment = 1

    #     for value_comment in did_you_know_comment_elements:
    #         if id_comment % 2 == 0:
    #             content_element = "//*[@id=\"__next\"]/main/div/section/div/section/div/div[1]/section[1]/div[1]/div["+ str(id_comment) +"]/div/div[2]"
    #             comment_elements = driver.find_elements(By.XPATH, content_element)
    #             did_you_know_comments.append(comment_elements[0].text)
    #             print(int(id_comment/2), ":", comment_elements[0].text)

    #         id_comment += 1

    #     did_you_know += [did_you_know_comments]
    #     print(did_you_know_comments)
        
    #     # Quay lại trang chính của phim
    #     # driver.get(page_url)
    #     driver.back()
    #     driver.execute_script("window.scrollTo(0, 5000);")
    #     time.sleep(5)
    id += 1
################################################
print("Did you know\n")

for i in range(len(did_you_know)):
    print(did_you_know[i][0])
    print(did_you_know[i][1])

driver.close()