import manager.dbConnector as db
import manager.dateManager as dp
import requests
import pandas as pd
import time

def get_stake_info(code):
    url = "http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd=%s&target=finsum_more" %(code)
    html = requests.get(url).text

    df_list = pd.read_html(html)#, index_col='주요재무정보')



    distriPerc = df_list[1].ix[6][1].split('/')[1]

    shares = df_list[1].ix[6][1].split('/')[0]
    print(["발행주식수",int(shares.replace('주 ','').replace(',',''))])
    print(['유통주식수',int(int(shares.replace('주 ','').replace(',',''))*float(distriPerc.replace('%',''))*0.01)])
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
        print(query)
        db.insert(query)
    print("======================================")




# Main
#



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

for eachRow in db.select(query):
    print(eachRow)

    if(len(eachRow) > 0):
        print(eachRow[0],'/',eachRow[1])

        try:
            get_stake_info(eachRow[0])
        except:
            print("error 발생!")
        time.sleep(0.5)
print("[INFO] 종목명/종목코드를 메모리에 읽어왔습니다")

# Main

# get_stake_info('216050')
