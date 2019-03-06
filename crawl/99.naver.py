import manager.dbConnector as db
import manager.dateManager as dp
import requests
import pandas as pd
import time
import re
from datetime import datetime as dt
from lxml import html

def get_stake_info(code):
    url = "http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=%s&target=finsum_more" %(code)
    html = requests.get(url).text

    df_list = pd.read_html(html)#, index_col='주요재무정보')



    distriPerc = df_list[1].ix[6][1].split('/')[1]

    shares = df_list[1].ix[6][1].split('/')[0]
    for i in range (0,len(df_list[4])):
        if(str(df_list[4].ix[i][0]) != 'nan'):
            print([df_list[4].ix[i][0].split('외')[0].strip(),int(round(df_list[4].ix[i][1]))])

    obj = []
    obj.append(["발행주식수",int(shares.replace('주 ','').replace(',',''))])
    obj.append(['유통주식수',int(int(shares.replace('주 ','').replace(',',''))*float(distriPerc.replace('%',''))*0.01)])
    for i in range(0, len(df_list[4])):

        if(str(df_list[4].ix[i][0]) != 'nan'):
            obj.append([df_list[4].ix[i][0].split('외')[0].strip(),df_list[4].ix[i][1]])

    for eachObj in obj:

        #데이터 db insert
        query = 'INSERT INTO jazzdb.T_STOCK_SHARES_INFO VALUES("%s","%s","%s","%s")' %(code,eachObj[0],eachObj[1],dp.todayStr('n'))
        db.insert(query)


def get_ohlc(code):
    url = "https://finance.naver.com/item/coinfo.nhn?code=%s" % (code)

    page = requests.get(url).content.decode('euc-kr', 'ignore')
    tree = html.fromstring(page)

    obj = tree.xpath('//dl[@class="blind"]//text()')

    target = ['현재가', '시가', '고가', '저가', '거래량', '거래대금']
    targetDic = {

        '현재가': 'CLOSE',
        '시가': 'OPEN',
        '고가': 'HIGH',
        '저가': 'LOW',
        '거래량': 'VOLUME',
        '거래대금': 'AMOUNT'

    }

    targetDicValue = {}
    for each in obj:
        if (len(each.strip()) > 0):
            content = each.split(' ')
            if (content[0] in target):
                print(targetDic[content[0]], content[1])
                targetDicValue[targetDic[content[0]]] = int(re.search(r'\d+', content[1].replace(',', '')).group())


    query = '''
            INSERT INTO `jazzdb`.`T_STOCK_OHLC_DAY` (`STOCKCODE`, `DATE`, `OPEN`, `HIGH`, `LOW`, `CLOSE`, `VALUE`, `ADJCLASS`, `ADJRATIO`) VALUES ('%s', '%s', '%d', '%d', '%d', '%d', '%d', '0', '-1');
            ''' % (
    code, today, targetDicValue['OPEN'], targetDicValue['HIGH'], targetDicValue['LOW'], targetDicValue['CLOSE'],
    targetDicValue['AMOUNT'])

    print(query)
    db.insert(query)

# Main
#

today = dt.now().date()
query = """

                    SELECT A.STOCKCODE, A.STOCKNAME
                    FROM jazzdb.T_STOCK_CODE_MGMT A
                    WHERE 1=1
                    AND A.STOCKCODE NOT IN (

                        SELECT STOCKCODE
                        FROM jazzdb.T_STOCK_SHARES_INFO
                        WHERE DATE = '%s'
                        GROUP BY STOCKCODE
                    )
                    AND A.LISTED = 1
                                                    """ % (dp.todayStr('n'))



existsList = []

print("[DEBUG] CRAWLING 시작")

for i,eachRow in enumerate(db.select(query)):

    if(len(eachRow) > 0):

        if(i%50==0):
            print(eachRow[0],'/',eachRow[1])

        try:
            get_stake_info(eachRow[0])
            get_ohlc(eachRow[0])
        except:
            print(i,eachRow,"error 발생!")
        time.sleep(0.1)
