import sys
from PyQt5.QtWidgets import *
from PyQt5.QAxContainer import *
from PyQt5.QtCore import *
import time
import os


def writetempFile(tempstr):
    a = open("temp.txt", 'w',encoding='utf-8')
    a.write(tempstr)
    a.close()

def readTempFile():


    a = open("temp.txt",'r',encoding='utf-8')
    rtlist = []
    for er in a.readlines():
        rtlist.append(er.replace('\n','').split('\t'))

    return rtlist

class Kiwoom(QAxWidget):
    def __init__(self):
        super().__init__()
        self._create_kiwoom_instance()
        self._set_signal_slots()

    def _create_kiwoom_instance(self):
        self.setControl("KHOPENAPI.KHOpenAPICtrl.1")


    def _set_signal_slots(self):
        self.OnEventConnect.connect(self._event_connect)
        self.OnReceiveTrData.connect(self._receive_tr_data)


    def refresh(self):
        self.close()

        self.disconnect()
        self._create_kiwoom_instance()


        self.dynamicCall("CommConnect()")
        self.login_event_loop = QEventLoop()
        self.login_event_loop.exec_()

    def comm_connect(self):
        self.dynamicCall("CommConnect()")
        self.login_event_loop = QEventLoop()
        self.login_event_loop.exec_()

    def _event_connect(self, err_code):
        if err_code == 0:
            print("[INFO] 키움증권 manager 접속완료...")
        else:
            print("[INFO] 키움증권 manager 접속에러 발생...")

        self.login_event_loop.exit()

    def set_input_value(self, id, value):
        self.dynamicCall("SetInputValue(QString, QString)", id, value)


    def get_list(self,market):


        flag = 0 if market == 'p' else 10
        ret = self.dynamicCall("GetCodeListByMarket(QString)", [flag])

        code_list = ret.split(';')
        rtlist = []

        for stockcode in code_list:
            name = self.dynamicCall("GetMasterCodeName(QString)", [stockcode])
            rtlist.append([stockcode,name,0 if market == 'p' else 1,'1'])

        return rtlist

    def comm_rq_data(self, rqname, trcode, next, screen_no):

        try:

            # print(rqname,trcode,next,screen_no)
            self.dynamicCall("CommRqData(QString, QString, int, QString", rqname, trcode, next, screen_no)
            self.tr_event_loop = QEventLoop()
            self.tr_event_loop.exec_()

            #return a




        except :
            print("exception")

    def _comm_get_data(self, code, real_type, field_name, index, item_name):
        ret = self.dynamicCall("CommGetData(QString, QString, QString, int, QString", code,
                               real_type, field_name, index, item_name)
        return ret.strip()

    def _get_repeat_cnt(self, trcode, rqname):
        ret = self.dynamicCall("GetRepeatCnt(QString, QString)", trcode, rqname)
        return ret

    def _receive_tr_data(self, screen_no, rqname, trcode, record_name, next, unused1, unused2, unused3, unused4):
        if next == '2':
            self.remained_data = True
        else:
            self.remained_data = False


        if rqname == "opt10001_req":
            self._opt10001(rqname, trcode)
        elif rqname == "opt10081_req":
            self._opt10081(rqname, trcode)
        elif rqname == 'opt10078_req':
            self._opt10078(rqname,trcode)
        elif rqname == 'opt10044_req':
            self._opt10044(rqname,trcode)
        elif rqname == 'opt10060_req':
            self._opt10060(rqname,trcode)

        elif rqname == 'opt20068_req':
            self._opt20068(rqname,trcode)

        elif rqname == 'opt10078_reqdb':
            self._opt10078db(rqname, trcode)


        elif rqname == 'opt10060_reqdb':
            self._opt10060db(rqname, trcode)




        try:
            self.tr_event_loop.exit()
        except AttributeError:
            pass


    def _opt10001(self, rqname, trcode):
        # data_cnt = self._get_repeat_cnt(trcode, rqname)
        # for i in range(data_cnt):


        name = self._comm_get_data(trcode, "", rqname, 0, "종목명")
        volume = self._comm_get_data(trcode, "", rqname, 0, "거래량")
        writetempFile(""+name+" 오늘의 거래량:" + volume)
        #print("[RESULT]", name,volume)


    def _opt10081(self,rqname,trcode):

        data_cnt = self._get_repeat_cnt(trcode, rqname)
        tempStr = ""

        stockCode = self._comm_get_data(trcode, "", rqname, 0, "종목코드")

        for i in range(data_cnt):

            date = self._comm_get_data(trcode, "", rqname, i, "일자")
            open = self._comm_get_data(trcode, "", rqname, i, "시가")
            high = self._comm_get_data(trcode, "", rqname, i, "고가")
            low = self._comm_get_data(trcode, "", rqname, i, "저가")
            close = self._comm_get_data(trcode, "", rqname, i, "현재가")
            volume = self._comm_get_data(trcode, "", rqname, i, "거래량")
            value = self._comm_get_data(trcode, "", rqname, i, "거래대금")
            adjustClass = self._comm_get_data(trcode, "", rqname, i, "수정주가구분")
            adjustRatio = self._comm_get_data(trcode, "", rqname, i, "수정비율")
            #print(date,open,high,low,close,volume,value)


            if(len(adjustClass) == 0):
                adjustClass = 0

            if len(adjustRatio) == 0 : adjustRatio = -1


            tempStr = tempStr + stockCode +'\t' + date +'\t' + open +'\t' + high +'\t' + low +'\t' + close +'\t' + value + '\t' + str(adjustClass) +'\t' + str(adjustRatio) +'\n'
        # print('sssss', tempStr, data_cnt)
        writetempFile(tempStr)



    def _opt10078(self,rqname,trcode):

        data_cnt = self._get_repeat_cnt(trcode, rqname)

        tempStr = ""
        for i in range(data_cnt):
            date = self._comm_get_data(trcode, "", rqname, i, "일자")
            sp = self._comm_get_data(trcode, "", rqname, i, "순매수수량")
            buy = self._comm_get_data(trcode, "", rqname, i, "매수수량")
            sell = self._comm_get_data(trcode, "", rqname, i, "매도수량")

            tempStr = tempStr + date + '\t' + buy + '\t' + sell + '\t' + sp + '\n'


        writetempFile(tempStr)



    def _opt10044(self,rqname,trcode):

        tempStr =""
        data_cnt = self._get_repeat_cnt(trcode, rqname)
        for i in range(data_cnt):
            name = self._comm_get_data(trcode, "", rqname, i, "종목명")
            amount = self._comm_get_data(trcode, "", rqname, i, "순매수수량")
            vary = self._comm_get_data(trcode,"",rqname,i,"대비율")

            tempStr = tempStr + name + '\t' + amount + '\t' + vary + '\n'

        writetempFile(tempStr)

    def _opt10060(self,rqname,trcode):

        tempStr =""
        data_cnt = self._get_repeat_cnt(trcode, rqname)
        for i in range(data_cnt):
            date = self._comm_get_data(trcode, "", rqname, i, "일자")
            price= self._comm_get_data(trcode, "", rqname, i, "현재가")
            forSum = self._comm_get_data(trcode, "", rqname, i, "외국인투자자")
            insSum = self._comm_get_data(trcode, "", rqname, i, "기관계")
            finan = self._comm_get_data(trcode, "", rqname, i, "금융투자")

            samo = self._comm_get_data(trcode, "", rqname, i, "사모펀드")
            yg = self._comm_get_data(trcode, "", rqname, i, "연기금등")
            tusin = self._comm_get_data(trcode, "", rqname, i, "투신")
            nation = self._comm_get_data(trcode, "", rqname, i, "국가")
            insur = self._comm_get_data(trcode, "", rqname, i, "보험")

            volume = self._comm_get_data(trcode,"",rqname,i,'누적거래대금')
            per = self._comm_get_data(trcode, "", rqname, i, '개인투자자')
            bank = self._comm_get_data(trcode, "", rqname, i, '은행')
            otherfinan = self._comm_get_data(trcode, "", rqname, i, '기타금융')
            othercorpor = self._comm_get_data(trcode, "", rqname, i, '기타법인')

            otherfor = self._comm_get_data(trcode, "", rqname, i, '내외국인')

            tempStr = tempStr + date + '\t' + price  + '\t' + volume + '\t' + forSum + '\t' + insSum + '\t' + per  + '\t'  +finan+ '\t' +samo + '\t' + yg + '\t' + tusin + '\t' + insur+ '\t'+ nation + '\t'+ bank + '\t'+ otherfinan + '\t'+othercorpor + '\t' + otherfor + '\n'
            #tempStr = tempStr + date + '\t' + price  + '\t' + forSum + '\t' + insSum + '\t' +finan+ '\t' +samo + '\t' + yg + '\t' + tusin + '\t' + insur+ '\t'+ nation + '\t'+ volume + '\t'+ per + '\t'+ bank + '\t'+ otherfinan + '\t'+othercorpor + '\t' + otherfor + '\n'

        writetempFile(tempStr)


    def _opt20068(self,rqname,trcode):
        tempStr =""
        data_cnt = self._get_repeat_cnt(trcode, rqname)
        for i in range(data_cnt):
            date = self._comm_get_data(trcode, "", rqname, i, "일자")
            balanceCount = self._comm_get_data(trcode, "", rqname, i, "대차거래증감")
            tempStr = tempStr + date + '\t' + balanceCount  + '\n'

        writetempFile(tempStr)



app = QApplication(sys.argv)



