import subprocess
from datetime import datetime as dt

def processrunner_forwin(srcname,itrnum, wincode):

    processStart = dt.now()
    print('[INFO] RUNNING SCRIPT : ', srcname , ' for ', itrnum ,'times')

    for itr in range(itrnum):

        process = subprocess.Popen(["python", srcname, wincode])
        print(process.communicate()[0])  # 프로세스가 끝날때까지 기다리는 명령
        print("[INFO] ", srcname, itrnum, ' PROCESS END, TIME SPEND :', dt.now() - processStart)

#for winCode in ['36','42','44','45','54','61','58','43','35','41']:

for winCode in ['36', '41']:
    processrunner_forwin('07.crawl_forwin.py',3, winCode)
