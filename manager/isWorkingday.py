import requests
from datetime import datetime as dt


def get_stake_info():
    url = "https://finance.naver.com/sise/sise_index.nhn?code=KOSPI"
    html = requests.get(url).text

    for eachline in html.split('\n'):
        if('<span id="time">' in str(eachline)):
            rt = eachline.lstrip().split(">")[1][:10]
            rt = rt.replace('.','-')
    return rt
today_date = (dt.now().date())
date_from_naver = get_stake_info()

print(today_date)
print(date_from_naver)



# 시나리오

# 6시에 이소스가 돌아감
# 오늘 장이 열렸고, 닫혔는지 확인
# 장이 종료되었으면, 크롤러 인스턴스를 실행함
