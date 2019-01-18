# import pyodbc
import mysql.connector as mc
import constant as cs

class Database:

    def list_employees(self, code):
        ip = cs.ip
        id = cs.id
        pw = cs.pw
        dbScheme = cs.dbScheme
        self.cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
        cursor = self.cnxn.cursor()
        query = '''
                           SELECT A.STOCKNAME, A.STOCKCODE, CAST(A.DATE AS char) AS DATE, B.ADJRATIO 
                               , B.OPEN, B.HIGH, B.LOW, B.CLOSE
                               , C.VOLUME
                               , C.FOREI
                               , C.INS, C.PER, C.YG, C.SAMO, C.TUSIN, C.FINAN, C.BANK, C.NATION, C.INSUR, C.OTHERCORPOR, C.OTHERFOR, C.OTHERFINAN


                            FROM
                            (
                               SELECT A.STOCKNAME, A.STOCKCODE, DIX.DATE
                               FROM jazzdb.T_STOCK_CODE_MGMT A

                               JOIN (

                                 SELECT DATE   
                                  FROM jazzdb.T_DATE_INDEXED
                                 WHERE CNT BETWEEN 0 AND 299

                               ) DIX 

                               WHERE 1=1
                               AND (STOCKCODE = '%s' OR STOCKNAME = '%s')
                            ) A


                            JOIN (
                               SELECT STOCKCODE, DATE, OPEN, HIGH, LOW, CLOSE, ADJCLASS, ADJRATIO
                               FROM jazzdb.T_STOCK_OHLC_DAY
                            ) B ON (A.STOCKCODE = B.STOCKCODE AND A.DATE = B.DATE )


                            JOIN (
                               SELECT STOCKCODE, DATE, VOLUME
                               , FOREI, INS, PER, YG, SAMO, TUSIN, FINAN, BANK, INSUR, NATION, OTHERCORPOR, OTHERFOR, OTHERFINAN
                               FROM jazzdb.T_STOCK_SND_DAY
                            ) C ON (A.STOCKCODE = C.STOCKCODE AND A.DATE = C.DATE )
                            ;
        ''' % (code, code)
        cursor.execute(query)
        rt = {'result':
                  [dict(zip([column[0] for column in cursor.description], row))
                   for row in cursor.fetchall()]}

        self.cnxn.close()
        return rt


def employees(code=None):
    def db_query():
        db = Database()
        emps = db.list_employees(code)
        return emps

    res = db_query()
    return res


def sndRank(column, interval,order,by):


    queryhead = '''
    
            SELECT B.STOCKNAME, DATE, CLOSE, 


    '''

    toselect = ['P','I','F']

    for each in column:
        toselect.append(each)


    querycont = ''
    for eachcolumn in toselect:
        for eachinterval in interval:
            querycont = querycont + str(eachcolumn)+str(eachinterval)+', '

    print('[DEBUG]' , querycont[:-2])

    querytail = '''
    
        FROM jazzdb.T_STOCK_SND_ANALYSIS_RESULT_TEMP A
        JOIN jazzdb.T_STOCK_CODE_MGMT B USING (STOCKCODE)
        JOIN jazzdb.T_DATE_INDEXED C USING (DATE)
        WHERE 1=1
        AND (I1>0 OR F1>0) 
        AND C.CNT = 0
        ORDER BY %s1 %s
        LIMIT 200
    
    '''%(order[0],by[0])

    fullquery = queryhead + querycont[:-2] + querytail
    print('fq: \n ', fullquery)




    query = '''

        SELECT B.STOCKNAME, B.STOCKCODE, DATE, CLOSE, 
            P1, P3, P5, P20, P60, 
            I1, I3, I5, I20, I60, 
            F1, F3, F5, F20, F60, 
            PS1, PS3, PS5, PS20, PS60, 
            FN1, FN3, FN5, FN20, FN60, 
            YG1, YG3, YG5, YG20, YG60, 
            S1, S3, S5, S20, S60, 
            T1, T3, T5, T20, T60, 
            IS1, IS3, IS5, IS20, IS60, 
            NT1, NT3, NT5, NT20, NT60, 
            BK1, BK3, BK5, BK20, BK60, 
            OC1, OC3, OC5, OC20, OC60
        FROM jazzdb.T_STOCK_SND_ANALYSIS_RESULT_TEMP A
        JOIN jazzdb.T_STOCK_CODE_MGMT B USING (STOCKCODE)
        JOIN jazzdb.T_DATE_INDEXED C USING (DATE)
        WHERE 1=1
        AND (I1>0 OR F1>0)
        AND C.CNT = 0
        ORDER BY I1 DESC
        LIMIT 40

    '''
    ip = cs.ip
    id = cs.id
    pw = cs.pw
    dbScheme = cs.dbScheme
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(fullquery)



    column = cursor.column_names
    rt = {'result':
              [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]}

    dt =rt['result'][0]['DATE']

    cnxn.close()

    return column, rt, dt