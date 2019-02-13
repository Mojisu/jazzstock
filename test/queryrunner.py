import manager.dbConnector as db


query = '''

    SELECT *
    FROM jazzdb.T_DATE_INDEXED
    


'''


for each in db.select(query):
    print(each)