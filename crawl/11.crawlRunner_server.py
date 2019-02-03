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




wholeStart = dt.now()
# server mode , sys argv 가 주어짐, 그러면 특정시간범위 안이면 이 스크립트가 실행되게
if(len(sys.argv)==1):

    if(dt.now().time().hour in [12,13]):
        processrunner('03.crawl_snd_basic.py', 1)

# local mode
else :

    processrunner('01.boot.py',1)
    processrunner('03.crawl_snd_basic.py',3)
    processrunner('04.dateindexupdate.py',1)
    processrunner('05.sndBasicAnalysis.py',1)
    processrunner_forwin('07.crawl_forwin.py',3)

print("[INFO]  WHOLE PROCESS END, TIME SPEND :'", dt.now() - wholeStart)
