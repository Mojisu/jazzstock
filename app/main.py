# -*- coding: utf-8 -*-
from dao import dao_sndChart
from flask import Flask, render_template, request, redirect, url_for, flash
import copy

application = Flask(__name__)

@application.route('/')
def home():
    return render_template('home.html')

@application.route('/info')
def info():
    return render_template('home.html')

@application.route('/sndChart', methods=['GET'])
def sndChart():

    requestedCode = request.args.get('stockcode')

    dao = dao_sndChart.Database()
    rs = dao.nameCodeValidation(requestedCode)

    chartData = None
    infoData = None

    # rs[0] => 종목명이 존재하면
    if (rs[0]):
        chartData = dao.sndChart(requestedCode)
        infoData = dao.stockinfo(rs[1][1])

        recentRowFromDB=copy.deepcopy(chartData['result'][-1])

        # 최신데이터가 없으면 차트데이터에 가격만 붙여주는 작업
        print('[DEBUG] ',rs[1])
        print('[DEBUG] MAIN.PY, SNDCHART, INFODATA FROM KRX', infoData)
        print('[DEBUG] MAIN.PY, SNDCHART, CHARTDATA FROM KRX', chartData)

        if(infoData != None and infoData['DATE']!=recentRowFromDB['DATE']):

            for each in recentRowFromDB.keys():
                if(each in infoData.keys()):
                    recentRowFromDB[each] = infoData[each]
                    print(each,recentRowFromDB[each])
                elif(each not in ['STOCKNAME','STOCKCODE','ADJRATIO']):
                    recentRowFromDB[each] = 0

            chartData['result'].append(recentRowFromDB)
        else:
            infoData=chartData['result'][-1]


    return render_template('sndChart.html', stockinfo=infoData, sampledata=chartData,stockname=rs[1])


@application.route('/sndRankRelative', methods=['GET','POST'])
def sndRankRelative():

    if request.method == 'POST':

        print("[DEBUG] FORM VALUE IN DICTIONARY :" , dict(request.form))

        if('window' in dict(request.form)):
            request_window = dict(request.form)['window']
        else:
            request_window = ['YG','S']


        if('interval' in dict(request.form)):
            request_interval = dict(request.form)['interval']
        else:
            request_interval = ['1','5','20']

        if ('order' in dict(request.form)):
            request_order = dict(request.form)['order']
        else:
            request_order = ['I']

        if ('by' in dict(request.form)):
            request_by = dict(request.form)['by']
        else:
            request_by = ['DESC']

    # select option == None, default option
    else:
        request_window = ['YG', 'S']
        request_by = ['DESC']
        request_order = ['I']
        request_interval = ['1', '5', '20']

    dao = dao_sndChart.Database()
    column, table, dt = dao.sndRank(request_window,request_interval,request_order,request_by)
    return render_template('sndRankRelative.html', sampledata=table, column=column, date = dt)

@application.route('/sndRankIndependence', methods=['GET','POST'])
def sndRankIndependence():
    if request.method == 'POST':





        if ('order' in dict(request.form)):
            request_order = dict(request.form)['order']
        else:
            request_order = ['I']

        if ('by' in dict(request.form)):
            request_by = dict(request.form)['by']
        else:
            request_by = ['DESC']





    else:

        print('xx')
        request_by = ['ASC']
        request_order = ['I']

    dao = dao_sndChart.Database()
    column, table, dt = dao.sndIndependent(request_order, request_by)
    return render_template('sndRankIndependence.html', sampledata=table, column=column, date = dt)

if __name__ == '__main__':
    application.run(debug=True)