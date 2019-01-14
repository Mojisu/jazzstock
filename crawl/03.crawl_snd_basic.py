import manager.dateManager as dp
import manager.dbConnector as db
import manager.Kiwoom as kapi
import manager.apiManager as am
import time
import sys


def db_readAll(dt):
    # DB에서 [종목명,종목코드] 로 구성된 데이터셋을 받아옴.
    # dbUpdateDate = db.selectSingleValue('SELECT max(date) FROM test.t_stock_shares_info')

    query = """

                        SELECT A.STOCKCODE, A.STOCKNAME
                        FROM jazzdb.T_STOCK_CODE_MGMT A
                        WHERE 1=1
                        AND A.STOCKCODE NOT IN (

                            SELECT STOCKCODE
                            FROM jazzdb.T_STOCK_SND_DAY
                            WHERE DATE = '%s'
                            GROUP BY STOCKCODE
                        )
                        AND A.LISTED = 1
                                                        """ % (dt)

    for eachRow in db.select(query):
        if (len(eachRow) > 0):
            itemDic[eachRow[1].upper()] = eachRow[0]
            codeDic[eachRow[0]] = eachRow[1].upper()

    print("[INFO] 종목명/종목코드를 메모리에 읽어왔습니다, 남은 종목 수: ", len(itemDic.keys()))


itemDic, codeDic = {},{}

apiObj = kapi.Kiwoom()
apiObj.comm_connect()
dateA, dateB = am.api_checkDate(apiObj, dp.todayStr('n'))

if (len(sys.argv) > 1):
    dateA = sys.argv[1]
    print("PASSED ARGV : ", dateA) # 과거 수집용
else:
    print("PASSED ARGV : None") # 일 배치

db_readAll(dateA)
start = time.time()

for i,eachCode in enumerate(list(codeDic.keys())[:min([len(codeDic),995])]):

    try:
        am.api_getSndDB(apiObj, eachCode, dateA)
        time.sleep(0.48)

        if (i !=0 and i % 40 == 0):
            print("[INFO]:", i, eachCode, codeDic[eachCode], "inserted", time.time() - start)
            #print("[INFO]: wait for 30 second")
            time.sleep(2)

    except:
        print('[INFO]: INSERT ERROR :', eachCode)
        time.sleep(1.5)


apiObj.destroy()
