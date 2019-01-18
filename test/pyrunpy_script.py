import sys
import time

if len(sys.argv)== 1:
    print('nothing to return')
else:
    for each in sys.argv[1:]:
        print(each)

time.sleep(5)
print('end~')