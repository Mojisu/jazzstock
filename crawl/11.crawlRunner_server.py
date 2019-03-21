import subprocess
from datetime import datetime as dt
import sys
import time

def processrunner(srcname,itrnum):

    processStart = dt.now()
    print('[INFO] RUNNING SCRIPT : ', srcname , ' for ', itrnum ,'times')

    for itr in range(itrnum):

        process = subprocess.Popen(["python", srcname])
        print(process.communicate()[0])  # 프로세스가 끝날때까지 기다리는 명령
        print("[INFO] ", srcname, itrnum, ' PROCESS END, TIME SPEND :', dt.now() - processStart)

def processrunner_forwin(srcname,itrnum, wincode):

    processStart = dt.now()
    print('[INFO] RUNNING SCRIPT : ', srcname , ' for ', itrnum ,'times')

    for itr in range(itrnum):

        process = subprocess.Popen(["python", srcname, wincode])
        print(process.communicate()[0])  # 프로세스가 끝날때까지 기다리는 명령
        print("[INFO] ", srcname, itrnum, ' PROCESS END, TIME SPEND :', dt.now() - processStart)


def processrunner_forwin_prev(srcname,itrnum, wincode, date):

    processStart = dt.now()
    print('[INFO] RUNNING SCRIPT : ', srcname , ' for ', itrnum ,'times')

    for itr in range(itrnum):

        process = subprocess.Popen(["python", srcname, wincode,date])
        print(process.communicate()[0])  # 프로세스가 끝날때까지 기다리는 명령
        print("[INFO] ", srcname, itrnum, ' PROCESS END, TIME SPEND :', dt.now() - processStart)


wholeStart = dt.now()
# server mode , sys argv 가 주어짐, 그러면 특정시간범위 안이면 이 스크립트가 실행되게
if(len(sys.argv)==0):

    if(dt.now().time().hour in [12,13]):
        processrunner('03.crawl_snd_basic.py', 1)

# local mode
else :



    # processrunner('01.boot.py',1)
    #
    # processrunner('03.crawl_snd_basic.py',3)
    # processrunner('04.dateindexupdate.py',1)
    # processrunner('05.sndBasicAnalysis.py',1)
    #
    # for winCode in ['61', '58', '43', '35', '41']:
    #         processrunner_forwin('07.crawl_forwin.py',1,winCode)
    #
    #
    # for winCode in ['36','42', '44', '45', '54']:
    #         processrunner_forwin('07.crawl_forwin.py',1,winCode)
    #
    # for winCode in ['33', '06', '03', '37']:
    #     processrunner_forwin('07.crawl_forwin.py',1,winCode)
    #
    # processrunner('08.merge_forwin.py',1)



     for winCode in ['33', '06', '03', '37']:
            # processrunner_forwin_prev('07.crawl_forwin.py', 3, winCode, '20190228')
        processrunner_forwin_prev('07.crawl_forwin.py', 3, winCode, '20190321')


     processrunner('08.merge_forwin.py',1)

print("[INFO]  WHOLE PROCESS END, TIME SPEND :'", dt.now() - wholeStart)
