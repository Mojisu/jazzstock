import subprocess
from datetime import datetime as dt

def processrunner(srcname,itrnum):

    processStart = dt.now()
    print('[INFO] RUNNING SCRIPT : ', srcname , ' for ', itrnum ,'times')

    for itr in range(itrnum):

        process = subprocess.Popen(["python", srcname])
        print(process.communicate()[0])  # 프로세스가 끝날때까지 기다리는 명령
        print("[INFO] ", srcname, itrnum, ' PROCESS END, TIME SPEND :', dt.now() - processStart)


processrunner('01.boot.py',1)
processrunner('02.naver.py',1)
processrunner('03.crawl_snd_basic.py',3)
processrunner('04.dateindexupdate.py',1)
processrunner('05.sndBasicAnalysis.py',1)
processrunner('06.crawl_ohlc.py',3)

