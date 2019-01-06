import manager.dateManager as dp
import manager.dbConnector as db
import manager.Kiwoom as kapi
import manager.apiManager as am
import time
import sys

def db_readAll(dt,winCode):
    # DB에서 [종목명,종목코드] 로 구성된 데이터셋을 받아옴.
    # dbUpdateDate = db.selectSingleValue('SELECT max(date) FROM test.t_stock_shares_info')

    query = """

                        SELECT A.STOCKCODE, A.STOCKNAME
                        FROM jazzdb.T_STOCK_CODE_MGMT A
                        WHERE 1=1
                        AND A.STOCKCODE NOT IN (

                            SELECT STOCKCODE
                            FROM jazzdb.T_STOCK_SND_WINDOW_ISOLATED
                            WHERE DATE = '%s'
                            AND WINCODE = '%s'
                            GROUP BY STOCKCODE
                        )
                        AND A.LISTED = 1
                                                        """ % (dt,winCode)

    for eachRow in db.select(query):
        if (len(eachRow) > 0):
            itemDic[eachRow[1].upper()] = eachRow[0]
            codeDic[eachRow[0]] = eachRow[1].upper()

    print("[INFO] 종목명/종목코드를 메모리에 읽어왔습니다, 남은 종목 수: ", len(itemDic.keys()))

itemDic = {}
codeDic = {}

apiObj = kapi.Kiwoom()
apiObj.comm_connect()

dateA, dateB = am.api_checkDate(apiObj, dp.todayStr('n'))

print(dp.todayStr('n'))
print(dateA, dateB)

target_dt = dateA[:4] + '-' + dateA[4:6] + '-' + dateA[6:]



print(dateA, sys.argv[1])
db_readAll(dateA,sys.argv[1])



itr = 0
start = time.time()
for eachCode in codeDic.keys():
    itr += 1

    # inserted_data_size = am.api_getSndForWin(apiObj, eachCode, dateA, sys.argv[1])
    # time.sleep(0.5)
    # print("[INFO]:", itr, eachCode, codeDic[eachCode], sys.argv[1], inserted_data_size, "rows inserted",
    #       time.time() - start)
    # if (itr % 18 == 0):
    #     print("[INFO]: wait for 30 second")
    #     time.sleep(1)
    #
    try:
        inserted_data_size = am.api_getSndForWin(apiObj, eachCode, dateA, sys.argv[1])
        time.sleep(0.5)
        print("[INFO]:", itr, eachCode, codeDic[eachCode],sys.argv[1], inserted_data_size, "rows inserted", time.time()-start)
        if (itr % 18 == 0):
            print("[INFO]: wait for 30 second")
            time.sleep(1)

    except:
        print('error! :', eachCode)
        itr += 1
        time.sleep(1.5)



