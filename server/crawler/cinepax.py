# Scrapping showtimes from cinepax


import json
import time
import datetime

from json import JSONEncoder
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains

# Karachi 3
# Lahore 4
# Islamabad 10
# No Multan


class Movie:
    def __init__(self, title, showtimes):
        self.showtimes = showtimes
        self.title = title

    def get_name(self):
        return self.title

    def get_showtimes(self):
        return self.showtimes

    def set_name(self, title):
        self.title = title

    def set_screen(self, screen):
        self.screen = screen


class Showtime:
    def __init__(self, address, screen):
        self.address = address
        self.screen = screen

    def get_address(self):
        return self.address

    def get_screen(self):
        return self.screen

    def set_address(self, address):
        self.address = address

    def set_screen(self, screen):
        self.screen = screen


class MovieEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


def getShowtimes(code, city, last):

    try:
        # print("\n************"+str(city)+"************\n\n")
        driver.get("https://www.cinepax.com/schedule//0/" + str(code))

        elements = driver.find_elements_by_class_name('item')
        movies_list = list()
        count = len(elements)
        for e in elements:
            a = e.find_elements_by_tag_name('a')
            for i in a:

                driver.implicitly_wait(4)
                ActionChains(driver).move_to_element(i).click(i).perform()
                time.sleep(1)
                now = datetime.datetime.now()
                showDate = datetime.datetime(
                    now.year, now.month, (int(i.text[-2:], 10)))

                if(showDate < now):
                    if(showDate.month == 12 and showDate.year == now.year):
                        showDate = datetime.datetime(
                            now.year + 1, 1, (int(i.text[-2:], 10)))
                    elif(showDate.year == now.year and showDate.month == now.month and showDate.day < now.day):
                        showDate = datetime.datetime(
                            now.year, now.month + 1, (int(i.text[-2:], 10)))

                x = {
                    "city": str(city),
                    "showDate": str(showDate),
                    "showDay": i.text[0:3],
                    "scrapeDate": str(now),
                    "movie": PrintShowtimeDetails()
                }

                movies = json.dumps(x, indent=4, cls=MovieEncoder)

                movies_list.append(movies)
            if(last == 1):
                movies_list.append(",")
            elif(last == 0 and count > 1):
                movies_list.append(",")
            count = count - 1

        return movies_list
    except Exception as e:

        return "Error scrapping " + str(city) + " data. "


def PrintShowtimeDetails():
    page_source = driver.page_source
    assert "No results found." not in driver.page_source

    soup = BeautifulSoup(page_source, 'lxml')

    span = soup.find('span', {'id': 'secMovieInfo'})
    sections = span.findChildren('section', {'id': 'secMovieInfo'})

    if not sections:
        return ''

    for _s in sections:

        name_section = _s.find('h3').text
        showtime_section = _s.findChildren(
            'section', {'class': 'cp-schedule-cinema'})
        all_showtimes = list()

        for _showtime in showtime_section:
            screens = _showtime.find('ul')
            screens_set = list()
            for item in screens.findAll('li'):
                screens_set.append(item.text)

            showtime = Showtime(_showtime.find('h4').text, screens_set)
            all_showtimes.append(showtime)

        movie = Movie(name_section, all_showtimes)
        return movie


options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_experimental_option("excludeSwitches", ["enable-logging"])
# options.add_experimental_option("excludeSwitches")
options.add_argument('--headless')
driver = webdriver.Chrome(
    "D:/Projects/Movie Hut Project/Movie Hut/server/crawler/chromedriver", options=options)

# print("\nStarting Scraping Data....\n\n")
leftBracket = "["
rightBracket = "]"
# comma = ","
print(leftBracket)
print(*getShowtimes(10, "Islamabad", 1))
print(*getShowtimes(3, "Karachi", 1))
print(*getShowtimes(4, "Lahore", 0))
# print(comma)

# print(comma)

print(rightBracket)

# print(leftBracket + *getShowtimes(4, "Lahore")+comma + str(*getShowtimes(3, "Karachi"))
#       + comma + str(*getShowtimes(10, "Islamabad"))+rightBracket)
# print('{', *getShowtimes(4, "Lahore"), ',' *getShowtimes(3, "Karachi"),
#       ',', *getShowtimes(10, "Islamabad"), '}', flush=True)
# print(*getShowtimes(3, "Karachi"))
# print(*getShowtimes(10, "Islamabad"))

# print("Scraping Done.\n")
driver.quit()
