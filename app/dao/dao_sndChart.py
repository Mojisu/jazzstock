#import pyodbc
import mysql.connector as mc

class Database:
    def __init__(self):

        print('hi')

        # self.cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
        # self.cnxn =  pyodbc.connect('DRIVER={MySQL ODBC 5.3 ANSI Driver};PORT=%s;SERVER=%s;DATABASE=%s;UID=%s;PWD=%s' % (port, ip, dbScheme, id, pw))


    def list_employees(self, code):
        ip = '106.10.39.168'
        id = 'root'
        pw = 'coffee'
        dbScheme = 'jazzdb'
        self.cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
        cursor = self.cnxn.cursor()
        query = '''
                          SELECT A.STOCKNAME, A.DATE, B.ADJRATIO 
                               , B.OPEN, B.HIGH, B.LOW, B.CLOSE
                               , C.VOLUME
                               , C.FOREI
                               , C.INS, C.PER, C.YG, C.SAMO, C.TUSIN, C.FINAN, C.BANK, C.INSUR, C.OTHERCORPOR, C.OTHERFOR, C.OTHERFINAN
                            
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
        ''' % (code,code)
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