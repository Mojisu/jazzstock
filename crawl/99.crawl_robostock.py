import manager.dbConnector as db
import manager.dateManager as dp
import requests
import pandas as pd
import time
from lxml import html



def db_readAll():
    # DB에서 [종목명,종목코드] 로 구성된 데이터셋을 받아옴.
    # dbUpdateDate = db.selectSingleValue('SELECT max(date) FROM test.t_stock_shares_info')

    query = """

                        SELECT A.STOCKCODE, A.STOCKNAME
                        FROM jazzdb.T_STOCK_CODE_MGMT A
                        WHERE 1=1
                        AND A.STOCKCODE NOT IN (

                            SELECT STOCKCODE
                            FROM jazzdb.T_STOCK_CATEGORY_ROBO
                            GROUP BY STOCKCODE
                            
                        )
                        AND A.LISTED = 1
                                                        """
    for eachRow in db.select(query):
        if (len(eachRow) > 0):
            itemDic[eachRow[1].upper()] = eachRow[0]
            codeDic[eachRow[0]] = eachRow[1].upper()

    print("[INFO] 종목명/종목코드를 메모리에 읽어왔습니다, 남은 종목 수: ", len(itemDic.keys()))

itemDic, codeDic = {},{}
db_readAll()

for each in codeDic.keys():
    url = "http://www.robostock.co.kr/analysis.kw?code=%s" % (each)
    page = requests.get(url)
    tree = html.fromstring(page.content)
    obj = tree.xpath('//div[@class="r_title_section r_ts_topline"]//li//text()')
    if(len(obj)>0):
        print(each,codeDic[each],obj)
        for i,eachCate in enumerate(obj):
            query = "INSERT INTO `jazzdb`.`T_STOCK_CATEGORY_ROBO` (`STOCKCODE`, `CATEGORY`,`RN`) VALUES ('%s', '%s', '%s')"%(each,eachCate,i+5)
            db.insert(query)
            print(query)
            time.sleep(0.01)


