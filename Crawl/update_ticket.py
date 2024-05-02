import mysql.connector
import requests
import re
from bs4 import BeautifulSoup

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111"
headers = {"User-Agent": user_agent, "Accept-Language": "en-US,en;q=0.5"}

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

def crawl(soup):
    div_all_ticket = soup.find('div', {'class': 'a-section a-spacing-none mojo-performance-summary-table'})

    div_ticket = div_all_ticket.find_all('div', recursive=False)

    domestic = div_ticket[0].find('span', {'class': 'a-size-medium a-text-bold'}).text

    international = div_ticket[1].find('span', {'class': 'a-size-medium a-text-bold'}).text

    worldwide = div_ticket[2].find('span', {'class': 'a-size-medium a-text-bold'}).text

    if "–" in domestic:
        domestic = None
    else:
        domestic = domestic.replace("$", "").replace(",", "").replace(".", "").strip()
        print("Domestic: " + domestic)

    if "–" in international:
        international = None
    else:
        international = international.replace("$", "").replace(",", "").replace(".", "").strip()
        print("International: " + international)

    if "–" in worldwide:
        worldwide = None
    else:
        worldwide = worldwide.replace("$", "").replace(",", "").replace(".", "").strip()
        print("Worldwide: " + worldwide)




def page_search(soup, movie_name, year):
    div_all = soup.find('div', {'class': 'a-section a-spacing-medium a-spacing-top-medium'})

    all_div_content = div_all.find_all('div', {'class': 'a-fixed-left-grid'})

    for div in all_div_content:
        a_movie_name = div.find('a', {'class': 'a-size-medium a-link-normal a-text-bold'})
        span_year = div.find('span', {'class': 'a-color-secondary'})

        movie_name_search = a_movie_name.text
        year_search = span_year.text.strip().strip('()')

        if str(movie_name_search) == str(movie_name) and str(year_search) == str(year):
            print(movie_name_search + " - " + year_search)

            link_to_movie = a_movie_name["href"]
            url = "https://www.boxofficemojo.com" + link_to_movie

            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                soup_cv = BeautifulSoup(response.text, "html.parser")  
                crawl(soup_cv)
            else:
                print("Fail")
        


str_select_movie_name = "SELECT movie_name FROM `filmdata`.`movieinformation`;" 
mycursor.execute(str_select_movie_name)
movie_names = mycursor.fetchall() 

if movie_names:
    for movie_info in movie_names:
        movie_name = movie_info[0]

        str_select_year_manufacture = "SELECT year_manufacture FROM `filmdata`.`movieinformation` WHERE movie_name = '" + movie_name + "';"
        mycursor.execute(str_select_year_manufacture)
        year_manufacture = mycursor.fetchone()

        url = "https://www.boxofficemojo.com/search/?q=" + movie_name

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            soup_cv = BeautifulSoup(response.text, "html.parser")  
            
            page_search(soup_cv, movie_name, year_manufacture[0])
        else:
            print("Fail")

        print("---------------------------------------------------")

else:
    print("Not movie")


