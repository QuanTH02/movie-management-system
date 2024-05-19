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

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

url = "https://www.imdb.com/title/tt11389872/mediaviewer/rm404060929/?ref_=tt_ov_i"
response = requests.get(url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    open("test111.html", "w", encoding='utf-8').write(str(soup))
    
else:
    print("Failed to fetch data:", response.status_code)