# -*- coding: utf-8 -*-
from dao import dao_sndChart
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/sndChart', methods=['GET', 'POST'])
def sndChart():

    print(request.method)

    if(request.method == 'POST'):
        requestedCode = request.form['stockcode']
    else:
        requestedCode = request.args.get('stockcode')


    return render_template('sndChart.html', sampledata=dao_sndChart.employees(requestedCode))

@app.route('/sampledb', methods=['GET', 'POST'])
def sampledb():
    if request.method == 'POST':
        return render_template('sampledb.html', sampledata=dao_sndChart.sndRank(request.form['stockcode']))
    else:
        return render_template('sampledb.html', sampledata=dao_sndChart.sndRank(request.args.get['stockcode']))

if __name__ == '__main__':
    app.run(debug=True)