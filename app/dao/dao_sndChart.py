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

    def sndRank(self, column, interval, order, by, market, mcrange):


        queryhead = '''
        
                SELECT B.STOCKNAME
                    , CASE WHEN B.MARKET = '0' THEN '' ELSE '*' END AS MARKET
                    , CASE WHEN E.CATEGORY IS NULL THEN 'NONE' ELSE E.CATEGORY END AS CATEGORY
                    , FORMAT(D.SHARE*CLOSE/100000000000,1) AS MC
                    , DATE
                    , CLOSE,
    
        '''

        toselect = ['P','I','F']

        for each in column:
            toselect.append(each)


        querycont = ''
        for eachcolumn in toselect:
            for eachinterval in interval:
                querycont = querycont + str(eachcolumn)+str(eachinterval)+', '

        querycont = querycont + order[0] + 'R'
        #print('[DEBUG]' , querycont)

        querytail= '''
        
            FROM jazzdb.T_STOCK_SND_ANALYSIS_RESULT_TEMP A
            JOIN jazzdb.T_STOCK_CODE_MGMT B USING (STOCKCODE)
            JOIN jazzdb.T_DATE_INDEXED C USING (DATE)
            JOIN (
            
                SELECT STOCKCODE, SHARE
                FROM
                (
                    SELECT STOCKCODE, SHARE, DATE,
                        ROW_NUMBER() OVER (PARTITION BY STOCKCODE ORDER BY DATE DESC) AS RN 
                    FROM jazzdb.T_STOCK_SHARES_INFO
                    WHERE 1=1
                    AND HOLDER = '발행주식수'
                ) A
                WHERE A.RN = 1
            
            ) D USING (STOCKCODE)
            LEFT JOIN ( 
            SELECT STOCKCODE, GROUP_CONCAT(CATEGORY) AS CATEGORY
            FROM jazzdb.T_STOCK_CATEGORY_ROBO
            GROUP BY STOCKCODE 
            )E
            USING(STOCKCODE)
            WHERE 1=1'''

        querycond = '''
        
            AND B.MARKET IN %s 
            AND (
        
        ''' % (str(market).replace('[','(').replace(']',')'))

        for i,each in enumerate(mcrange):
            #print(i,len(mcrange))
            querycond +=''' FORMAT(D.SHARE*CLOSE/100000000000,1) BETWEEN %s and %s 
            ''' %tuple(each.split(':'))
            if i < len(mcrange)-1:
                querycond +='''OR'''


        queryend = '''
            )
            AND (I1>0 OR F1>0) 
            AND C.CNT = 0
            ORDER BY %s1 %s
            LIMIT 100
        
        '''%(order[0],by[0])

        fullquery = queryhead + querycont + querytail + querycond + queryend
        #print('fq: \n ', fullquery)

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

        #print('[DEBUG]', querycont[:-2])

        querytail = '''
    
            FROM jazzdb.T_STOCK_SND_ANALYSIS_RESULT_TEMP A
            JOIN jazzdb.T_STOCK_CODE_MGMT B USING (STOCKCODE)
            JOIN jazzdb.T_DATE_INDEXED C USING (DATE)
            WHERE 1=1
            AND (
                (I1>0.005 AND IR <100) OR 
                (F1>0.005 AND FR <100) OR 
                (YG1>0.0025 AND YR <100) OR 
                (S1>0.0025 AND SR <100) OR 
                (T1>0.0025 AND TR <100) OR 
                (FN1>0.0025 AND FNR <100) OR 
                (IS1>0.0025 AND ISR <100) OR 
                (NT1>0.0025 AND NTR <100) OR 
                (BK1>0.0025 AND BKR <100) OR 
                (OC1>0.0025 AND OCR <100)
                
            )
            AND C.CNT = 0
            ORDER BY %sR %s
            LIMIT 100
    
        ''' % (order[0], by[0])

        fullquery = queryhead + querycont[:-2] + querytail
        #print('fq: \n ', fullquery)

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

        #print('[DEBUG] STOCKINFO METHOD LAUNCHED', stockcode)
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

        #print('[DEBUG] STOCKINFO METHOD RETURN VALUE', rtlist)
        #print('[DEBUG] STOCKINFO METHOD FINISHED', stockcode)

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

