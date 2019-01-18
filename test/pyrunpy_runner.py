import subprocess
from datetime import datetime as dt
# command line

# proc = subprocess.Popen("python pyrunpy_script.py 1 2 3 43 5 6 7 8 9" ,stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
# print(proc.communicate()[0])

# python

start = dt.now()
print('START : ', start)


for each in range (0,3):
    process = subprocess.Popen(["python", "pyrunpy_snd_basic.py"])
    print(process.communicate()[0]) # 프로세스가 끝날때까지 기다리는 명령

    print(each, "PROCESS END, TIME SPEND :", dt.now()-start)