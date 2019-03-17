import manager.dbConnector as db




query = '''

INSERT INTO jazzdb.T_STOCK_MA
SELECT STOCKCODE, DATE, MA3, MA5, MA10, MA20, MA60, MA120, VMA3, VMA5, VMA10, VMA20, VMA60, VMA120
FROM 
(
SELECT STOCKCODE, DATE, B.CNT, CLOSE, VOLUME,

	AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MA3,
    AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 4 PRECEDING AND CURRENT ROW) AS MA5,
    AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 9 PRECEDING AND CURRENT ROW) AS MA10,
    AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 19 PRECEDING AND CURRENT ROW) AS MA20,
    AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 59 PRECEDING AND CURRENT ROW) AS MA60,
    AVG(ABS(CLOSE)) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 119 PRECEDING AND CURRENT ROW) AS MA120,

	AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS VMA3,
    AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 4 PRECEDING AND CURRENT ROW) AS VMA5,
    AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 9 PRECEDING AND CURRENT ROW) AS VMA10,
    AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 19 PRECEDING AND CURRENT ROW) AS VMA20,
    AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 59 PRECEDING AND CURRENT ROW) AS VMA60,
    AVG(VOLUME) OVER (PARTITION BY STOCKCODE ORDER BY DATE ASC ROWS BETWEEN 119 PRECEDING AND CURRENT ROW) AS VMA120
FROM jazzdb.T_STOCK_SND_DAY A
JOIN jazzdb.T_DATE_INDEXED B USING (DATE)
WHERE 1=1
AND A.STOCKCO DE <> '079940'
AND B.CNT < 150
) RS
WHERE CNT BETWEEN 0 AND 100


'''