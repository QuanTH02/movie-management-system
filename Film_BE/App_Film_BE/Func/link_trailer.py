import requests
from bs4 import BeautifulSoup
import re

def search_link(str, str1):
    pattern = re.escape(str1) + r'[^"]*'

    match = re.search(pattern, str)

    if match:
        str2 = match.group(0)
        return str2
    else:
        return ""
    
def main_link_trailer(url_page):
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
    headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

    url = url_page
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        link = search_link(str(soup), "https://imdb-video.media-imdb.com/")
        soup = str(soup).replace(link, "")

        link1 = search_link(str(soup), "https://imdb-video.media-imdb.com/").replace("\\u0026", "&")
        return link1
    else:
        return ""
    
def main_link_img(url_page):
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
    headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

    url = url_page
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        link = search_link(str(soup), "https://m.media-amazon.com/images/").replace("\\u0026", "&")
        return link
    else:
        return ""