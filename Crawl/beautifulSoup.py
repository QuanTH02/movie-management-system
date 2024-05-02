import requests
from bs4 import BeautifulSoup

url = "https://www.imdb.com/title/tt6791350/?ref_=adv_li_tt"
response = requests.get(url)

print(response.status_code)

soup = BeautifulSoup(response.content, "html.parser")

test = soup.find(class_ = "sc-afe43def-1 fDTGTb")

print(test)

