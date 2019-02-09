# import pyodbc
import mysql.connector as mc
import constant as cs
import requests
from datetime import datetime as dt
from xml.etree import ElementTree as et

class Database:


    ip = cs.ip
    id = cs.id
    pw = cs.pw
    dbScheme = cs.dbScheme
    cnxn = ''

    def getConn(self):

        self.cnxn = mc.connect(host=self.ip, database=self.dbScheme, user=self.id, password=self.pw)

    def closeConn(self):

        self.cnxn.close()


    def sndChart(self, code):

        self.getConn()
        cursor = self.cnxn.cursor()
        query = '''
                            SELECT A.STOCKNAME, A.STOCKCODE, CAST(A.DATE AS char) AS DATE, B.ADJRATIO 
                               , B.OPEN, B.HIGH, B.LOW, B.CLOSE
                               , C.VOLUME
                               , C.FOREI
                               , C.INS, C.PER, C.YG, C.SAMO, C.TUSIN, C.FINAN, C.BANK, C.NATION, C.INSUR, C.OTHERCORPOR, C.OTHERFOR, C.OTHERFINAN
                               , MG, GM, CS, MR, MQ, CL, UB, NM, DC, DW


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
                            
							JOIN (
                               SELECT STOCKCODE, DATE, MG, GM, CS, MR, MQ, CL, UB, NM, DC, DW
                               FROM jazzdb.T_STOCK_SND_WINDOW_MERGED
                            ) D ON (A.STOCKCODE = D.STOCKCODE AND A.DATE = D.DATE );
        ''' % (code, code)
        cursor.execute(query)
        rt = {'result':
                  [dict(zip([column[0] for column in cursor.description], row))
                   for row in cursor.fetchall()]}



        self.closeConn()
        return rt

    def sndRank(self, column, interval, order, by):


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
            AND C.CNT = 1
            ORDER BY %s1 %s
            LIMIT 100
        
        '''%(order[0],by[0])

        fullquery = queryhead + querycont[:-2] + querytail
        print('fq: \n ', fullquery)

        self.getConn()
        cursor = self.cnxn.cursor()
        cursor.execute(fullquery)



        column = cursor.column_names
        rt = {'result':
                  [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]}

        dt =rt['result'][0]['DATE']
        # dt = '2019-12-12'

        self.closeConn()

        return column, rt, dt


    def sndIndependent(slef,order, by):

        column = ['FR', 'IR', 'YR', 'SR', 'TR', 'FNR', 'ISR', 'NTR', 'BKR', 'OCR']
        interval = [1,5]
        queryhead = '''
    
                SELECT B.STOCKNAME, DATE, CLOSE, 
    
    
        '''

        toselect = ['P', 'F', 'I']



        querycont = ''
        for eachcolumn in toselect:
            for eachinterval in interval:
                querycont = querycont + str(eachcolumn) + str(eachinterval) + ', '

        for each in column:
            querycont = querycont + str(each) + ', '

        print('[DEBUG]', querycont[:-2])

        querytail = '''
    
            FROM jazzdb.T_STOCK_SND_ANALYSIS_RESULT_TEMP A
            JOIN jazzdb.T_STOCK_CODE_MGMT B USING (STOCKCODE)
            JOIN jazzdb.T_DATE_INDEXED C USING (DATE)
            WHERE 1=1
            AND (
                (I1>0.01 AND IR <50) OR 
                (F1>0.01 AND FR <50) OR 
                (YG1>0.005 AND YR <50) OR 
                (S1>0.005 AND SR <50) OR 
                (T1>0.005 AND TR <50) OR 
                (FN1>0.005 AND FNR <50) OR 
                (IS1>0.005 AND ISR <50) OR 
                (NT1>0.005 AND NTR <50) OR 
                (BK1>0.005 AND BKR <50) OR 
                (OC1>0.005 AND OCR <50)
                
            )
            AND C.CNT = 0
            ORDER BY %sR %s
            LIMIT 100
    
        ''' % (order[0], by[0])

        fullquery = queryhead + querycont[:-2] + querytail
        print('fq: \n ', fullquery)

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

        dt = rt['result'][0]['DATE']
        # dt = '2019-12-12'

        cnxn.close()

        return column, rt, dt

    # 입력값이 DB에 존재하는지 확인하는 메소드
    def nameCodeValidation(self,stockcode):

        self.getConn()
        cursor = self.cnxn.cursor()
        query = '''

                               SELECT A.STOCKNAME, A.STOCKCODE
                               FROM jazzdb.T_STOCK_CODE_MGMT A
                               WHERE 1=1
                               AND (STOCKCODE = '%s' OR STOCKNAME = '%s')

                            ;
        ''' % (stockcode,stockcode)
        cursor.execute(query)
        dbrs = cursor.fetchall()
        if (len(dbrs)) > 0:
            rs = [True,dbrs[0]]
        else:
            rs = [False,None]

        self.closeConn()
        return rs



    def stockinfo(self,stockcode):

        print('[DEBUG] STOCKINFO METHOD LAUNCHED', stockcode)
        url = 'http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=%s' %(stockcode)
        xml = et.fromstring(requests.get(url).content.strip())
        # keys = ['day_Date','day_Start','day_High','day_Low','day_EndPrice','day_Volume','day_getAmount']
        keys = ['day_Date', 'day_Start', 'day_High', 'day_Low', 'day_EndPrice', 'day_Volume']
        convertKeys = {

            'day_Date':'DATE',
            'day_Start':'OPEN',
            'day_High':'HIGH',
            'day_Low':'LOW',
            'day_EndPrice':'CLOSE',
            'day_Volume':'VOLUME',
        }
        rtlist = []
        for each in xml:
            for eachnode in each:
                eachrow = {}
                if(eachnode.tag == 'DailyStock'):
                    for eachkey in keys:
                        # 날짜 포맷팅
                        if(eachkey=='day_Date'):
                            #eachrow.append('20'+eachnode.attrib[eachkey].replace('/','-'))
                            eachrow[convertKeys[eachkey]]='20'+eachnode.attrib[eachkey].replace('/','-')
                        else:

                            eachrow[convertKeys[eachkey]] = int(eachnode.attrib[eachkey].replace(',',''))

                    rtlist.append(eachrow)

        print('[DEBUG] STOCKINFO METHOD RETURN VALUE', rtlist)
        print('[DEBUG] STOCKINFO METHOD FINISHED', stockcode)

        if(len(rtlist)>0):
            return rtlist[0]
        else:
            return None



    def sndChartForei(self, code):

        self.getConn()
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

