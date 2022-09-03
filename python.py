from copyreg import constructor
from datetime import date, datetime
import math
from sqlite3 import Date
from time import sleep
import configs
from imp import reload


while True:
    reload(configs)
    print("vertical aberta por:", round((configs.vertical / configs.ciclo) * configs.multiplicador, 2), "segundos")
    sleep((configs.vertical / configs.ciclo) * configs.multiplicador)
    print("vertical fechada")
    print("horizontal aberta por:",  round((configs.horizontal / configs.ciclo) * configs.multiplicador, 2), "segundos")
    sleep((configs.horizontal / configs.ciclo) * configs.multiplicador)
    print("horizontal fechada")
