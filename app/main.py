# -*- coding: utf-8 -*-
from dao import dao_sndChart
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/sndChart', methods=['GET', 'POST'])
def sndChart():
    return render_template('sndChart.html', sampledata=dao_sndChart.employees(request.form['StockID']))

@app.route('/sampledb', methods=['GET', 'POST'])
def sampledb():
    if request.method == 'POST':
        return render_template('sampledb.html', sampledata=dao_sndChart.employees(request.form['StockID']))
    else:
        return render_template('sampledb.html', sampledata=dao_sndChart.employees(request.args.get['StockID']))

if __name__ == '__main__':
    app.run(debug=True)