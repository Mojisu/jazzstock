import os
import time
import subprocess
import pandas as pd
import datetime as dt
import manager.dateManager as dm


#
#
# for i in [0,1,2]:
#
#     print(os.getcwd())
#     print(i,os.getpid())
#     # pid = subprocess.Popen(["python", "crawlSnd.py"]).pid
#
# #    process = subprocess.Popen(["python", "03_00.crawl_snd_basic.py"])
#     process = subprocess.Popen(["python", "03_00.crawl_snd_basic.py", '20190104'])
#
#     # 지금은 시간으로 대충 때려맞춰놨는데
#     # 프로세스에서 리턴값 받으면 킬하는걸로 수정필요함.
#     time.sleep(700)
#     pid = process.pid
#     process.kill()
#
#     print('PID : ', pid, ' killed !')
#     time.sleep(10)
#
#
# for i in [0,1,2]:
#
#     print(os.getcwd())
#     print(i,os.getpid())
#     # pid = subprocess.Popen(["python", "crawlSnd.py"]).pid
#     process = subprocess.Popen(["python", "03_01.crawl_ohlc.py",'20190104'])
#
#     # 지금은 시간으로 대충 때려맞춰놨는데
#     # 프로세스에서 리턴값 받으면 킬하는걸로 수정필요함.
#     time.sleep(680)
#     pid = process.pid
#     process.kill()
#
#     print('PID : ', pid, ' killed !')
#     time.sleep(10)

# 36: "모건", 42: "CS", 44: "메릴", 45: "골드만"
# 2: "신금투", 3: "한투", 6: "신영", 33: "모간서울", 71: "KTB", 54: "노무라", 61: "다이와", 58: "도이치", 43: "유비에스",
#                    35: "맥쿼리", 41: "CLSA"



# 45 끊음
for winCode in ['36','42','44','45','54','61','58','43','35','41']:
#for winCode in ['54','61','58','43','35','41']:

    for i in [0,1,2]:

        # pid = subprocess.Popen(["python", "crawlSnd.py"]).pid
        process = subprocess.Popen(["python", "03_02.crawl_forwin.py",winCode])

        # 지금은 시간으로 대충 때려맞춰놨는데
        # 프로세스에서 리턴값 받으면 킬하는걸로 수정필요함.
        time.sleep(700)
        pid = process.pid
        process.kill()

        print('PID : ', pid, ' killed !')
        time.sleep(10)
