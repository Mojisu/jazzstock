import mysql.connector as mc

ip = '106.10.39.168'
id = 'root'
pw = 'coffee'
dbScheme = 'jazzdb'

def insert(query):

    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()

    cursor.execute(query)
    # cursor.commit()
    cnxn.commit()
    cnxn.close()

def select(query):
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(query)
    table = cursor.fetchall()

    eachRow = []
    rtrlist = []
    for x in table:
        for y in list(x):
            eachRow.append(y)
        rtrlist.append(eachRow)
        eachRow = []

    cnxn.close()
    return rtrlist






def delete(query):
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(query,)

    cnxn.commit()
    cnxn.close()
    #return rtrlist



def selectInclueColumn(query):
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(query)
    table = cursor.fetchall()

    eachRow = []
    rtrlist = []
    for x in table:
        for y in list(x):
            eachRow.append(y)
        rtrlist.append(eachRow)
        eachRow = []

    cnxn.close()
    columns = [column[0] for column in cursor.description]
    return rtrlist,columns



def selectSingleValue(query):
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(query)
    table = cursor.fetchall()
    #print(type(table[0][0]))
    if(len(table) == 0):
        return None
    else:
        return table[0][0]


def selectSingleColumn(query):
    cnxn = mc.connect(host=ip, database=dbScheme, user=id, password=pw)
    cursor = cnxn.cursor()
    cursor.execute(query)
    table = cursor.fetchall()

    rtlist = []

    for eachRow in table:
        rtlist.append(eachRow[0])

    return rtlist



if(__name__ == '__main__'):

    query = 'SELECT * FROM jazzdb.T_STOCK_CODE_MGMT'
    test = selectInclueColumn(query)
    print(test)