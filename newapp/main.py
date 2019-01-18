# -*- coding: utf-8 -*-
from dao import dao_sndChart
from flask import Flask, render_template, request

application = Flask(__name__)

@application.route('/')
def home():
    return render_template('home.html')

@application.route('/sndChart', methods=['GET', 'POST'])
def sndChart():

    print(request.method)

    if(request.method == 'POST'):
        requestedCode = request.form['stockcode']
    else:
        requestedCode = request.args.get('stockcode')


    return render_template('sndChart.html', sampledata=dao_sndChart.employees(requestedCode))

@application.route('/sampledb', methods=['GET', 'POST'])
def sampledb():
    if request.method == 'POST':
        return render_template('sampledb.html', sampledata=dao_sndChart.sndRank(request.form['stockcode']))
    else:
        return render_template('sampledb.html', sampledata=dao_sndChart.sndRank(request.args.get['stockcode']))

if __name__ == '__main__':
    application.run(debug=True)