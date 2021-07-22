import time
import datetime as d


date = '21'
currentDate = d.datetime.now()
showDate = d.datetime(2021, 5, (int(date, 10)))

if(showDate < currentDate):
    if(showDate.month == 12 and showDate.year == currentDate.year):
        showDate = d.datetime(currentDate.year + 1, 1, (int(date, 10)))
    elif(showDate.year == currentDate.year and showDate.month == currentDate.month):
        showDate = d.datetime(
            currentDate.year, currentDate.month + 1, (int(date, 10)))

print(showDate.day)
