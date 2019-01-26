# -*- coding: utf-8 -*-
from dao import dao_sndChart
from flask import Flask, render_template, request

application = Flask(__name__)

@application.route('/')
def home():
    return render_template('home.html')

@application.route('/sndChart', methods=['GET'])
def sndChart():

    print(request.method)

    if(request.method == 'POST'):
        requestedCode = request.form['stockcode']
    else:
        requestedCode = request.args.get('stockcode')


    return render_template('sndChart.html', sampledata=dao_sndChart.employees(requestedCode))

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

        print('[DEBUG] rq win : ',request_window)
        print('[DEBUG] rq interval : ',request_interval)
        print('[DEBUG] rq order : ',request_order)
        print('[DEBUG] rq by : ',request_by)

        column, table, dt = dao_sndChart.sndRank(request_window,request_interval,request_order,request_by)
        return render_template('sndRankRelative.html', sampledata=table, column=column, date = dt)



    else:
        request_window = ['YG', 'S']
        request_by = ['DESC']
        request_order = ['I']
        request_interval = ['1', '5', '20']
        column, table, dt = dao_sndChart.sndRank(request_window, request_interval, request_order, request_by)
        return render_template('sndRankRelative.html', sampledata=table, column=column, date = dt)


@application.route('/sndRankIndependence', methods=['GET','POST'])
def sndRankIndependence():
    print("haha", print(request.method))
    if request.method == 'POST':


        print('yy')
        print("[DEBUG] FORM VALUE IN DICTIONARY :" , dict(request.form))



        if ('order' in dict(request.form)):
            request_order = dict(request.form)['order']
        else:
            request_order = ['I']

        if ('by' in dict(request.form)):
            request_by = dict(request.form)['by']
        else:
            request_by = ['DESC']

        print('[DEBUG] rq order : ',request_order)
        print('[DEBUG] rq by : ',request_by)

        column, table, dt = dao_sndChart.sndIndependent(request_order, request_by)
        return render_template('sndRankIndependence.html', sampledata=table, column=column, date = dt)



    else:

        print('xx')
        request_by = ['ASC']
        request_order = ['I']
        column, table, dt = dao_sndChart.sndIndependent(request_order, request_by)
        return render_template('sndRankIndependence.html', sampledata=table, column=column, date = dt)


if __name__ == '__main__':
    application.run(debug=True)